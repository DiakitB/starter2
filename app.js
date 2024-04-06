const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const express = require('express');

const morgan = require('morgan');

const app = express();

//MIDDLEWARE

app.use(morgan('dev'));
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
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`your app is listening at port ${PORT}`);
});
