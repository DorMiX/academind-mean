const express = require("express");

const userController = require("../controllers/user");

const app = express();

const usersRouter = express.Router();

// SIGNUP
usersRouter.route("/signup").post(userController.signUpUser);

// SIGNIN
usersRouter.route("/signin").post(userController.signInUser);

// GET all users
usersRouter.route("/").get(userController.getUsers);

module.exports = usersRouter;
