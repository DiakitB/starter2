const express = require('express');
const userController = require('../controllers/userController');
const authenController = require('../controllers/authenController');
const router = express.Router();
router.post('/signup', authenController.signup);
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
