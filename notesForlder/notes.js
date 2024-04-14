//FILTERING
// const queryObject = { ...req.query };
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
// excludedFields.forEach((el) => delete queryObject[el]);
///ADVANCE FILTERING
// let querySt = JSON.stringify(queryObject);
// querySt = querySt.replace(/\b(gte?|lte?)\b/g, (match) => `$${match}`);

// let query = Tour.find(JSON.parse(querySt));

//SORTING
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   console.log(sortBy);
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('createAt');
// }

/// FIELD LIMITING
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }

// pagination

// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// if (req.query.page) {
//   const numDoc = await Tour.countDocuments();
//   query = query.skip(skip).limit(limit);
//   if (req.query.page >= numDoc) throw new Error("this page doesn't exist");
// }
