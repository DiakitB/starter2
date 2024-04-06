const express = require('express');
const userController = require('../controllers/userController');
const route = express.Router();
route
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createNewUser);

route
  .route('/:id')
  .get(userController.getAUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = route;
