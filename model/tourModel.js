const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, 'A tour must have a rating'],
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must a price'],
  },
});

/// CREATING OUR MODEL OUT OF OUR SCHEMA

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
