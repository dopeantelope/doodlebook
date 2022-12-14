const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User")

module.exports = {
  uploadPost: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id })
      res.render("upload.ejs", { posts: posts, user: req.user });
    }
    catch(err) {
      console.error(err)
    }
  },

  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(post.user)
      res.render("post.ejs", { req: req, post: post, user: req.user, userName: user.userName, likes: post.likes, comments: post.comments });
      
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate({ _id: req.params.id }, {$push: { likes: req.user._id }}, { new : true })
      console.log("liked post");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  unlikePost: async (req, res) => {
    try {
      await Post.findByIdAndUpdate({_id: req.params.id},{$pull: { likes: req.user._id }},{ new: true })
      res.redirect(`/post/${req.params.id}`);
      console.log('unliked post')

    } catch(err) {
      console.log(err)
    }
  },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id });
      console.log("deleted post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

  comment: async (req, res) => {
    try {
      const comment = await { text: req.body.caption, postedBy: req.user.userName };
      await Post.findByIdAndUpdate({_id: req.params.id}, {$push: { comments: comment }},
        { new: true }
      )
      console.log(req.user.userName)
      res.redirect(`/post/${req.params.id}`);
    } catch(err) {
      console.log(err)
    }
  },

  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById({ _id: req.params.id })
      await Post.findByIdAndUpdate({_id: req.params.id}, {$pull: { comments: {_id: req.params.commentId}}})

      console.log(req.params.commentId)
      
      res.redirect(`/post/${req.params.id}`);
    } catch(err) {
      console.log(err)
    }
  },
};