const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

//MIDDLEWARE

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
app.use((req, res, next) => {
  console.log(`hello from middleware 👋👋`);
  next();
});

// READING FILE
const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours: tours,
    },
  });
};
/// ROUTE HANDLERS
const getAtourById = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id == id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Ops ! it seems like you have inter the wrong ID ',
      },
    });
  }

  res.status(200).json({
    status: 'success',

    data: {
      tour: tour,
    },
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id == id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Ops ! it seems like you have inter the wrong ID ',
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: `tour #${tour.id} was updated`,
    },
  });
};
const createNewTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const deleteATour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id == id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Ops ! it seems like you have inter the wrong ID ',
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

const getAllUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
const createNewUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
const updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
const getAUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success',
    },
  });
};
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getAtourById);

// app.patch('/api/v1/tours/:id', updateTour);
// app.post('/api/v1/tours', createNewTour);
// app.delete('/api/v1/tours/:id', deleteATour);

/// ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getAtourById)
  .patch(updateTour)
  .delete(deleteATour);

/////
///////// Users Route
app.route('/api/v1/users').get(getAllUser).post(createNewUser);

app
  .route('/api/v1/users/:id')
  .get(getAUser)
  .patch(updateUser)
  .delete(deleteUser);

/// SERVER
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`your app is listening at port ${PORT}`);
});
