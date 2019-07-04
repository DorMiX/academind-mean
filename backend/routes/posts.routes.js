const express = require('express');
const multer = require('multer');

const app = express();

const postsRouter = express.Router();

const checkAuth = require('../middlewares/check-auth');
const postController = require("../controllers/post");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

// UPLOADS
const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let err = new Error("Invalid file type!");
      if (isValid) {
        err = null;
      }
      cb(err, "uploads");
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  }
);

// CREATE
postsRouter.route('/add').post(
  checkAuth,
  multer({storage: storage}).single("image"),
  postController.createPost
);

// READ all
postsRouter.route('/').get(
  postController.readPosts
);

// READ by id
postsRouter.route('/edit/:id').get(
  postController.readPost
);

// UPDATE
postsRouter.route('/update/:id').put(
  checkAuth,
  multer({storage: storage}).single("image"),
  postController.updatePost
);

// DELETE
postsRouter.route('/delete/:id').get(
  checkAuth,
  postController.deletePost
);

module.exports = postsRouter;
