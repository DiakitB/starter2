const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const express = require('express');
const morgan = require('morgan');
const app = express();
if (process.env.NODE_ENV === 'developement') {
  // console.log(process.env);
  app.use(morgan('dev'));
}
// console.log(process.env);
//MIDDLEWARE

app.use(express.json());

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
