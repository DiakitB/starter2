const express = require('express');
const authenController = require('../controllers/authenController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router
  .route('/')
  .get(
    authenController.protected,
    authenController.restrictTo('user'),
    reviewController.getAllReview
  )
  .post(reviewController.createReview);

module.exports = router;
