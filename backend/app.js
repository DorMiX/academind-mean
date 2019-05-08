const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose.connect('mongodb://localhost:27017/academind-mean', {useNewUrlParser: true})
  .then(
    () => {
      console.log('Database connection is successful!');
    }
  )
  .catch(
    (err) => {
      console.log("Database connection is failed! Error: " + err);
    }
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  }
);

app.post(
  "/api/posts",
  (req, res, next) => {
    const post = new Post(
      {
        title: req.body.title,
        content: req.body.content,
      }
    );
    console.log(post);
    post.save();
    res.status(201).json(
      {
        message: "Post fetched successfully!",
        posts: post,
      }
    );
  }
);

app.get(
  "/api/posts",
  (req, res, next) => {
    Post.find()
      .then(
        (documents) => {
          res.status(200).json(
            {
              message: 'Post fetched successfully!',
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

module.exports = app;
