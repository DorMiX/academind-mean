const express = require('express');
const multer = require('multer');

const app = express();

const postsRouter = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let err = new Error("Invalid file");
      if (isValid) {
        err = null;
      }
      cb(err, "upload");
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  }
);

const Post = require('../models/post');

// CREATE
postsRouter.route('/add').post(
  multer(storage).single("image"),
  (req, res, next) => {
    const post = new Post(
      {
        title: req.body.title,
        content: req.body.content,
      }
    );
    post.save()
      .then(
        (createdPost) => {
          res.status(201).json(
            {
              message: "Post added successfully!",
              postId: createdPost._id,
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
          console.log("Error: " + err);
        }
      );
  }
);

// READ by id
postsRouter.route('/edit/:id').get(
  (req, res, next) => {
    Post.findById(req.params.id)
      .then(
        (post) => {
          if (post) {
            res.status(200).json(post);
          } else {
            res.status(404).json({message: "Post not found!"})
          }
        }
      )
      .catch(
        (err) => {
          console.log("Error: " + err);
        }
      );
  }
);

// UPDATE
postsRouter.route('/update/:id').put(
  (req, res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
    });
    Post.updateOne({_id: req.params.id}, post)
      .then((result) => {
        res.status(200).json({message: "Update successful!"});
      })
      .catch(
        (err) => {
          console.log("Error: " + err);
        }
      );
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
