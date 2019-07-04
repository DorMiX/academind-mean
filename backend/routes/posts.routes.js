const express = require('express');

const app = express();

const postsRouter = express.Router();

const checkAuth = require('../middlewares/check-auth');
const postController = require("../controllers/post");
const fileUploader = require("../middlewares/file-uploader");



// CREATE
postsRouter.route('/add').post(
  checkAuth,
  fileUploader,
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
  fileUploader,
  postController.updatePost
);

// DELETE
postsRouter.route('/delete/:id').get(
  checkAuth,
  postController.deletePost
);

module.exports = postsRouter;
