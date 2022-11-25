const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);
router.delete("/deletePost/:id", postsController.deletePost);

router.put("/likePost/:id", postsController.likePost);
router.put("/unlikePost/:id", postsController.unlikePost);

router.post("/comment/:id", postsController.comment);
router.put("/deleteComment/:id/:commentId", postsController.deleteComment);

module.exports = router;