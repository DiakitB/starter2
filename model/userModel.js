const mongoose = require('mongoose');
// const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'the max length a tour can have is 40 caracters'],
    minlength: [10, 'the min length a tour can have is 10 caracters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have an password'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'A user must have an password'],
  },
  photo: {
    type: String,
  },
});
const User = mongoose.model('User', userSchema);

/// CREATING OUR MODEL OUT OF OUR SCHEMA
module.exports = User;
