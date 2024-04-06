const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createNewUser);

router
  .route('/:id')
  .get(userController.getAUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
