const express = require('express');

const app = express();

const usersRouter = express.Router();

usersRouter.route("/signup").post(
  (req, res, error) => {
    
  }
);

module.exports = usersRouter;
