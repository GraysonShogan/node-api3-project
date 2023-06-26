// api/server.js
const express = require("express");
const helmet = require("helmet");
const postsRouter = require("./posts/posts-model");
const usersRouter = require("./users/users-router");
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("./middleware/middleware");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

module.exports = server;
