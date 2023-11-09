const express = require("express");
const routes = express();
const ReviewController = require("../controller/ReviewController");
const validation = require("../middleware/ExpressValidator");
const authValidation = require("../middleware/auth");

routes.get(
  "/get-review",
  authValidation.isAuthorized,
  validation.review,
  ReviewController.getReviews
);

routes.post(
  "/add-review",
  authValidation.isAuthorized,
  validation.review,
  ReviewController.addReview
);

module.exports = routes;
