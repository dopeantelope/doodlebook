const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User")

module.exports = {
  getInspirations: async (req, res) => {
    try {

    } catch(err) {
      console.log(err)
    }
  },

  addToInspirations: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user._id, { $push: { inspirations: req.body.postId }},
        { new: true })
    } catch(err) {
      console.log(err)
    }
  }
}

