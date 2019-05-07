const express = require('express');

const app = express();

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
        message: 'Post fetched succesfully!',
        posts: posts,
      }
    );
  }
);

module.exports = app;
