const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const express = require('express');
const morgan = require('morgan');
const app = express();
if (process.env.NODE_ENV === 'developement') {
  console.log(process.env);
  app.use(morgan('dev'));
}
console.log(process.env);
//MIDDLEWARE

app.use(express.json());

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log(req.requestTime);
//   next();
// });
// app.use((req, res, next) => {
//   console.log(`hello from middleware 👋👋`);
//   next();
// });

// READING FILE

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
/// SERVER
module.exports = app;
