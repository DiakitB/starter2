const User = require('../model/userModel');
const APIFeature = require('.././utils/apiFeature');
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
