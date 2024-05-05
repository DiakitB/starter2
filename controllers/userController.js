const User = require('../model/userModel');

const catchAsync = require('../utils/catchAsync');
const errorApi = require('../utils/errorApi');
const factory = require('./handlerFactory');

//////
//////
const filterObj = (obj, ...allowField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

/////
////

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

exports.getAllUsers = factory.getAll(User);
exports.createNewUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getAUser = factory.getOne(User);
