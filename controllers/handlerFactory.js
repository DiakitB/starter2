const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errorApi');
const APIFeature = require('.././utils/apiFeature');
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(201).json({
      status: 'success',
      data: {
        updatedDocument: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(new AppError('Please sign in ', 404));
    }
    res.status(201).json({
      status: 'success',
      data: {
        tour: doc,
      },
    });
  });

exports.getOne = (Model, popOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOption) query = query.populate(popOption);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    console.log(doc);
    res.status(200).json({
      status: 'success',
      data: {
        tour: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    ///TO ALLOW ACCESS TO NESTED ROUTES
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const features = new APIFeature(Model.find(filter), req.query)
      .filter()
      .sort()
      .fieldsLimit()
      .pagination();
    //// EXECUTE QUERY
    const doc = await features.query.explain();
    //// SEND RESPONSE OBJECT
    res.status(200).json({
      status: 'success',
      results: doc.length,

      data: {
        data: doc,
      },
    });
  });

// async (req, res) => {
//   try {
//     const features = new APIFeature(User.find(), req.query)
//       .filter()
//       .sort()
//       .fieldsLimit()
//       .pagination();
//     //// EXECUTE QUERY
//     const users = await features.query;
//     //// SEND RESPONSE OBJECT
//     res.status(200).json({
//       status: 'success',
//       results: users.length,

//       data: {
//         users: users,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
