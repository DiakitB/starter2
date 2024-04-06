const express = require('express');

const tourControllers = require('../controllers/tourControllers');
const route = express.Router();

route
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createNewTour);
route
  .route('/:id')
  .get(tourControllers.getAtourById)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteATour);

module.exports = route;
