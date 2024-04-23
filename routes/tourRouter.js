const express = require('express');
const authenController = require('../controllers/authenController');
const tourControllers = require('../controllers/tourControllers');
const router = express.Router();
// router.param('id', tourControllers.checkId);
router.route('/tour-stats').get(tourControllers.getTourStats);
router.route('/montly-plan/:year').get(tourControllers.getMontlyPlan);
router
  .route('/')
  .get(authenController.protected, tourControllers.getAllTours)
  .post(tourControllers.createNewTour);

router
  .route('/:id')
  .get(tourControllers.getAtourById)
  .patch(tourControllers.updateTour)
  .delete(
    authenController.protected,
    authenController.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteATour
  );

module.exports = router;
