const mongoose = require('mongoose');
const validator = require('validator');

const bcript = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],

    trim: true,
    maxlength: [40, 'the max length a user can have is 40 caracters'],
    // minlength: [5, 'the min length a user can have is 10 caracters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'A user must have an password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'A user must have an password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      messag: "Password don't match",
    },
  },
  photo: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // hashing the password
  this.password = await bcript.hash(this.password, 12);
  /// delete password confirmation field
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatPassword, userPassword) {
  return bcript.compare(candidatPassword, userPassword)
}
const User = mongoose.model('User', userSchema);

/// CREATING OUR MODEL OUT OF OUR SCHEMA
module.exports = User;
