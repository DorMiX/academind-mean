const express = require("express");
const bcrypt = require('bcrypt');

const User = require("../models/user");

const app = express();

const usersRouter = express.Router();

// SIGNUP
usersRouter.route("/signup").post(
  (req, res, error) => {
    bcrypt.hash(req.body.password, 10)
      .then(
        (hash) => {
          const user = new User(
            {
              email: req.body.email,
              password: hash,
              username: req.body.userName,
            }
          );
          user.save()
            .then(
              (result) => {
                res.status(201).json(
                  {
                    message: "User created successfully!",
                    result: result,
                  }
                );
              }
            )
            .catch(
              (err) => {
                res.status(500).json(
                  {
                    error: err,
                  }
                );
              }
            );
        }
      );
  }
);

// GET all
usersRouter.route('/').get(
  (req, res, next) => {
    User.find()
      .then(
        (documents) => {
          res.status(200).json(
            {
              message: 'Users fetched successfully!',
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

module.exports = usersRouter;
