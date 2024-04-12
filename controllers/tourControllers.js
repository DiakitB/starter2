const Tour = require('../model/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
// );
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name) {
//     return res.status(404).json({
//       status: 'fail',
//       data: {
//         message: 'A tour needs a name',
//       },
//     });
//   }

//   next();
// };
// exports.checkId = (req, res, next, val) => {
//   const id = req.params.id * 1;

//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       data: {
//         message: `Ops! it seems like ${id} is not a valid ID`,
//       },
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    /// FILTERING
    const queryObject = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);
    ///ADVANCE FILTERING
    let querySt = JSON.stringify(queryObject);
    querySt = querySt.replace(/\b(gte?|lte?)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(querySt));

    //SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('createAt');
    }

    /// FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,

      data: {
        tours: tours,
      },
    });
  } catch (err) {}
};
/// ROUTE HANDLERS
exports.getAtourById = async (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((tour) => tour.id == id);
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `Ops ! it seems like the id you enter is the wrong  Id`,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteATour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
