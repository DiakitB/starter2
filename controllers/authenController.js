const crypto = require('crypto');
const bcript = require('bcryptjs');
const User = require('../model/userModel');
const { promisify } = require('util');
const errorApi = require('../utils/errorApi');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');
const form = require('../utils/form');

const cookieOption = {
  expire: new Date(
    Date.now() + process.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100
  ),
  // secure: true,
  httpOnly: true,
};
const createSendToken = (user, status, res) => {
  const token = singinToken(user._id);
  res.cookie('jwt', token, cookieOption);
  user.password = undefined;
  res.status(status).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const singinToken = (id) => {
  form();
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME_OUT,
  });
};
////

/////
exports.signup = async (req, res) => {
  form();
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  /// 1check if email and password exist
  if (!email || !password) {
    return next(
      new errorApi('please provide a correct email and password', 404)
    );
  }
  /// 2 check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new errorApi('incorrect password or email', 401));
  }
  // console.log(user);
  // const token = singinToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
  createSendToken(user, 200, res);
});

exports.protected = catchAsync(async (req, res, next) => {
  /// 1 )GETTING TOKEN AND CHECK IF IT'S THERE
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(
      new errorApi(
        'your are not loging please sign in to get access to all the tours',
        401
      )
    );
  }
  /// 2) VERIFICATION TOKEN
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decode);
  ///3) CHECK IF USER EXIST
  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return next(new errorApi("this user doesn't exist "));
  }
  /// 4) CHECK IF USER CHANGE PASSWORD AFTER TOKEN HAS BEEN ISSUE
  req.user = freshUser;
  next();
  console.log(req.user);
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorApi('You are not authorized to perform this operation', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  //3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new errorApi('There was an error sending the email. Try again later!'),
      500
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  /// GET USER BASED ON TOKEN

  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gte: Date.now() },
  });
  if (!user) {
    return next(
      new errorApi(
        'Invalid token or  token as expired please do another request',
        400
      )
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = singinToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  /// Getting the user from collection
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new errorApi('wrong password', 401));
  }
  (user.password = req.body.password),
    (user.passwordConfirm = req.body.passwordConfirm);
  await user.save();
  createSendToken(user, 200, res);
});
