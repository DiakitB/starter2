const User = require('../model/userModel');
const errorApi = require('../utils/errorApi');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
console.log(jwt);

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIME_OUT,
    });

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
  console.log(user);
  const token = '';
  res.status(200).json({
    status: 'success',
    token,
  });
});
