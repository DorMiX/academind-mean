const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const postsRouter = require("./routes/posts.routes");

const app = express();

mongoose.connect('mongodb://localhost:27017/academind-mean', {useNewUrlParser: true})
// mongoose.connect("mongodb+srv://dormix:HUue7Yr6tH7ivDhg@dormix0-ddpjs.mongodb.net/academind-mean?retryWrites=true", {useNewUrlParser: true})
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

app.use(cors());

app.use("/api/posts", postsRouter);

module.exports = app;
