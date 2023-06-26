// api/middleware/middleware.js

function logger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method}
    REQUEST URL: ${req.originalUrl}
    TIMESTAMP: ${date.toLocaleString()}
  `);

  next();
}

function validateUserId(req, res, next) {
  // Check the database to see if there is a user with the specified id
  // If the id is valid, store the user object as req.user and allow the request to continue
  // If the id is not found, respond with status 404 and { message: "user not found" }
}

function validateUser(req, res, next) {
  // Validate the body on a request to create or update a user
  // If the request body lacks the required name field, respond with status 400 and { message: "missing required name field" }
}

function validatePost(req, res, next) {
  // Validate the body on a request to create a new post
  // If the request body lacks the required text field, respond with status 400 and { message: "missing required text field" }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
