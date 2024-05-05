const express = require('express');
const authenController = require('../controllers/authenController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

// ALL THE ROUTERS ARE PROTECTED AFTER THIS MIDDLEWARE
router.use(authenController.protected);
router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authenController.restrictTo('user'),
    reviewController.setTOurUserIds,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    authenController.restrictTo('user', 'admin'),
    reviewController.delteReview
  )
  .patch(
    authenController.restrictTo('user', 'admin'),
    reviewController.updateReview
  );

module.exports = router;
