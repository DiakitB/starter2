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
/// CREATING OUR SCHEMA

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    require: [true, 'A tour must have a rating'],
    default: 4.5,
  },
  price: {
    type: Number,
    require: [true, 'A tour must a price'],
  },
});

/// CREATING OUR MODEL OUT OF OUR SCHEMA

const Tour = mongoose.model('Tour', tourSchema);

//// CREATING AN INSTANCE OF OUR MODEL
const tesTour = new Tour({
  name: 'Rock clamer',
  rating: 6.3,
  price: 600,
});

/// SAVING OUR OBJECT IN THE MONGODB

tesTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERRO 🛑⛔🛑', err);
  });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`your app is listening at port ${port}`);
});
