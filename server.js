const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connection successful');
  });
/// CREATING OUR SCHEMA

//// CREATING AN INSTANCE OF OUR MODEL

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`your app is listening at port ${port}`);
});
