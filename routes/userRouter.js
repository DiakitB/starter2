const express = require('express');
const userController = require('../controllers/userController');
const authenController = require('../controllers/authenController');
const router = express.Router();
router.post('/signup', authenController.signup);
router.post('/login', authenController.login);
router.post('/forgotPassword', authenController.forgotPassword);
router.patch('/resetPassword/:token', authenController.resetPassword);
router.patch(
  '/updateMyPassword',
  authenController.protected,
  authenController.updatePassword
);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser);

router
  .route('/:id')
  .get(userController.getAUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
