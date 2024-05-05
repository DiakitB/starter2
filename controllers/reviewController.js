// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Review = require('../model/reviewModel');

exports.setTOurUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.delteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
