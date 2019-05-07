const express = require('express');

const app = express();

app.use(
  (req, res, next) => {
    console.log('This is my first middleware');
    next();
  }
);

app.use(
  (req, res, next) => {
    res.send('Hello from my first Express!');
  }
);

module.exports = app;
