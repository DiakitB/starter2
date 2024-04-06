const express = require('express');

const tourControllers = require('../controllers/tourControllers');
const router = express.Router();
router.param('id', tourControllers.checkId);
router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.checkBody, tourControllers.createNewTour);
router
  .route('/:id')
  .get(tourControllers.getAtourById)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteATour);

module.exports = router;
