const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
dotenv.config({ path: './config.env' });
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
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`your app is listening at port ${port}`);
});
