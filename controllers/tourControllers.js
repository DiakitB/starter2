const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

exports.getAllTours = (req, res) => {
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
exports.getAtourById = (req, res) => {
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

exports.updateTour = (req, res) => {
  exports.id = req.params.id * 1;
  exports.tour = tours.find((tour) => tour.id == id);
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
exports.createNewTour = (req, res) => {
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
exports.deleteATour = (req, res) => {
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
