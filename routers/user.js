const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const userController = require("../controllers/user");
const { ensureAuth } = require("../middleware/auth")


router.get("/inspirations", ensureAuth, userController.getInspirations)
router.post("/addToInspirations", userController.addToInspirations)