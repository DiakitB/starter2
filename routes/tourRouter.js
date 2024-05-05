const express = require('express');
const authenController = require('../controllers/authenController');
const tourControllers = require('../controllers/tourControllers');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('../routes/reviewRoute');
const router = express.Router();
//////
router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(tourControllers.getTourStats);

/////
router
  .route('/montly-plan/:year')
  .get(
    authenController.protected,
    authenController.restrictTo('admin', 'lead-guide', 'guide'),
    tourControllers.getMontlyPlan
  );

/////////////

//////
router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(
    authenController.protected,
    authenController.restrictTo('admin', 'lead-guide'),
    tourControllers.createNewTour
  );
router
  .route('/:id')
  .get(tourControllers.getAtourById)
  .patch(
    authenController.protected,
    authenController.restrictTo('admin', 'lead-guide'),
    tourControllers.updateTour
  )
  .delete(
    authenController.protected,
    authenController.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteATour
  );
// router
//   .route('/:tourId/reviews')
//   .post(
//     authenController.protected,
//     authenController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
