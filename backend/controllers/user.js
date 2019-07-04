// user controllers
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

// SIGNUP
exports.signUpUser = (req, res, error) => {
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
                  message: "Invalid authentication credentials!",
                }
              );
            }
          );
      }
    );
}

// SIGNIN
exports.signInUser = (req, res, error) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            message: "Authentication failed!",
          });
        } else {
          fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password);
        }
      }
    )
    .then(
      (result) => {
        if (!fetchedUser) {
          return res.status(401).json({
            message: "Authentication failed!",
          });
        } else {
          const token = jwt.sign(
            {email: fetchedUser.email, userId: fetchedUser._id},
            "secret_this_should_be_longer",
            {expiresIn: "1h", }
          );
          res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id,
          });
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

// get all users
exports.getUsers = (req, res, next) => {
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
