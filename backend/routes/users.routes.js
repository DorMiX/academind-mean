const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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

// SIGNIN
usersRouter.route("/signin").post(
  (req, res, error) => {
    User.findOne({email: req.body.email})
      .then(
        (user) => {
          if (!user) {
            return res.status(401).json({
              message: "Authentication failed!",
            });
          } else {
            return bcrypt.compare(req.body.password, user.password);
          }
        }
      )
      .then(
        (result) => {
          if (!user) {
            return res.status(401).json({
              message: "Authentication failed!",
            });
          } else {
            const token = jwt.sign(
              {email: user.email, userId: user._id},
              "secret_this_should_be_longer"
            );
          }
        }
      ).catch(
        (err) => {
          return res.status(401).json({
            message: "Authentication failed!",
          });
        }
      );
  }
);

// GET all
usersRouter.route("/").get(
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
