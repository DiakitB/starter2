const express = require('express');
const userController = require('../controllers/userController');
const authenController = require('../controllers/authenController');
const router = express.Router();

router.post('/signup', authenController.signup);
router.post('/login', authenController.login);
router.post('/forgotPassword', authenController.forgotPassword);
router.patch('/resetPassword/:token', authenController.resetPassword);

/// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(authenController.protected);

router.patch('/updateMyPassword', authenController.updatePassword);
router.get('/me', userController.getMe, userController.getAUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deletetMe);

// ONLY ADMIN HAS ACCESS TO THESE ROUTES

router.use(authenController.restrictTo('admin'));
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
