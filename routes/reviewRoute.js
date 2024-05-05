const express = require('express');
const authenController = require('../controllers/authenController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authenController.protected,
    authenController.restrictTo('user'),
    reviewController.setTOurUserIds,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(reviewController.delteReview)
  .patch(reviewController.updateReview);

module.exports = router;
