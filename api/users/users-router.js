const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res) => {
  const user = req.body;

  Users.insert(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating user" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating user" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then((deletedUser) => {
      res.status(200).json(deletedUser);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.getUserPosts(id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving user posts" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const { id } = req.params;
  const post = req.body;

  post.user_id = id;

  Posts.insert(post)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating post" });
    });
});

module.exports = router;
