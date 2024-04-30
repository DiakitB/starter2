const User = require('../model/userModel');
const APIFeature = require('.././utils/apiFeature');
const catchAsync = require('../utils/catchAsync');
const errorApi = require('../utils/errorApi');

const filterObj = (obj, ...allowField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = async (req, res) => {
  try {
    const features = new APIFeature(User.find(), req.query)
      .filter()
      .sort()
      .fieldsLimit()
      .pagination();
    //// EXECUTE QUERY
    const users = await features.query;
    //// SEND RESPONSE OBJECT
    res.status(200).json({
      status: 'success',
      results: users.length,

      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createNewUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
exports.getAUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  /// Throw an error if user try to change password

  if (req.body.password || req.body.confirmPassword) {
    return next(
      new errorApi(
        'You are note allow to change your password here please use the proper'
      )
    );
  }
  const filterBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'succes',
    data: {
      user: updateUser,
    },
  });
});

exports.deletetMe = catchAsync(async (req, res, next) => {
  // get user i

  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    datat: null,
  });
});
