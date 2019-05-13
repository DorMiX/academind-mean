const express = require('express');

const app = express();

const postsRouter = express.Router();

let Post = require('../models/post');

// CREATE
postsRouter.route('/add').post(
  (req, res, next) => {
    const post = new Post(
      {
        title: req.body.title,
        content: req.body.content,
      }
    );
    console.log(post);
    post.save()
      .then(
        (post) => {
          res.status(201).json(
            {
              message: "Post added successfully!",
              posts: post,
            }
          );
        }
      )
      .catch(
        (err) => {
          res.status(400).json(
            {
              message: "Unable to save to DB!"
            }
          )
        }
      );
  }
);

// READ all
postsRouter.route('/').get(
  (req, res, next) => {
    Post.find()
      .then(
        (documents) => {
          console.log("Documents fetched successfully");
          res.status(200).json(
            {
              message: 'Posts fetched successfully!',
              posts: documents,
            }
          );
        }
      )
      .catch(
        (err) => {
          console.log("Oppppsss! Error: " + err);
        }
      );
  }
);

// READ by id
postsRouter.route('/edit/:id').get(
  (req, res, next) => {

  }
);

// UPDATE
postsRouter.route('/update/:id').post(
  (req, res, next) => {

  }
);

// DELETE
postsRouter.route('/delete/:id').get(
  (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id })
      .then(
        (result) => {
          console.log(result);
          res.status(200).json(
            {
              message: "Post deleted successfully!",
            }
          );
        },
      )
      .catch((err) => {console.log("Error: " + err);});
  }
);

module.exports = postsRouter;
