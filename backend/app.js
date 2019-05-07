const express = require("express");
const bodyPraser = require("body-parser")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  }
);

api.use(
  "/api/posts",
  (req, res, next) => {
    const post = req.body;
    console.log();
    res.status(201).json(
      {
        message: "Post fetched successfully!",
        posts: posts,
      }
    );
  }
);

app.use(
  "/api/posts",
  (req, res, next) => {
    const posts = [
      {
        id: "aoa7ahuoq7zfaef",
        title: "First server-side post",
        content: "This is coming from server."
      },
      {
        id: "9sifj9884fjwlfe",
        title: "First server-side post",
        content: "This is coming from server, too."
      },
    ];
    res.status(200).json(
      {
        message: 'Post fetched successfully!',
        posts: posts,
      }
    );
  }
);

module.exports = app;
