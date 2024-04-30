const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

// console.log(process.env);
app.use(helmet());
app.use(morgan('dev'));

// console.log(process.env);
//MIDDLEWARE
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this API please try in an  hour',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
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
