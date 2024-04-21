const User = require('../model/userModel');
const errorApi = require('../utils/errorApi');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
console.log(jwt);
const singinToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME_OUT,
  });
};
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_TIME_OUT,
    // });
    const token = singinToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.loging = catchAsync(async (req, res, next) => {
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
  console.log(user);
  const token = singinToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.correct = catchAsync(async (req, res, next) => {
  /// 1 )GETTING TOKEN AND CHECK IF IT'S THERE

  /// 2) VERIFICATION TOKEN
  ///3) CHECK IF USER EXIST
  /// 4) CHECK IF USER CHANGE PASSWORD AFTER TOKEN HAS BEEN ISSUE
  next();
});
