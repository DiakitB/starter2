const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      requie: [true, 'A  review cannot be empty'],
    },
    rating: {
      type: Number,

      max: 15,
      min: 1,
    },
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      require: [true, 'Review must belong to a tour'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
