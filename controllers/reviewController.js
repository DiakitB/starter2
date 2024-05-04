const catchAsync = require('../utils/catchAsync');

const Review = require('../model/reviewModel');

exports.getAllReview = async (req, res) => {
  try {
    const review = await Review.find();

    res.status(200).json({
      status: 'success',
      resule: review.length,
      data: {
        review: review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createReview = catchAsync(async (req, res) => {
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
