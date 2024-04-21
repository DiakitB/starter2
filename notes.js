const singinToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME_OUT,
  });
};
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_TIME_OUT,
    // });
    const token = singinToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.loging = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  /// 1check if email and password exist
  if (!email || !password) {
    return next(
      new errorApi('please provide a correct email and password', 404)
    );
  }
  /// 2 check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new errorApi('incorrect password or email', 401));
  }
  console.log(user);
  const token = singinToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.correct = catchAsync(async (req, res, next) => {
  /// 1 )GETTING TOKEN AND CHECK IF IT'S THERE
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(
      new errorApi(
        'your are not loging please sign in to get access to all the tours',
        401
      )
    );
  }
  /// 2) VERIFICATION TOKEN
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decode);
  ///3) CHECK IF USER EXIST
  /// 4) CHECK IF USER CHANGE PASSWORD AFTER TOKEN HAS BEEN ISSUE
  next();
});

/// routes
router.post('/signup', authenController.signup);
router.post('/login', authenController.loging);
userSchema.methods.correctPassword = async function (
  candidatPassword,
  userPassword
) {
  return bcript.compare(candidatPassword, userPassword);
};
