const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();

// console.log(process.env);

// console.log(process.env);
// GLOBAL  MIDDLEWARE
app.use(helmet());
app.use(morgan('dev'));
/// Limit the number of request to the same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this API please try in an  hour',
});
////

app.use('/api', limiter);

/// Body parser reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

/// Data sanitization against NoSQL query injection

app.use(mongoSanitize());
//// Data sanitization against XSS
app.use(xss());
/// test Midleware
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

///
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
// READING FILE

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

/// SERVER
module.exports = app;
