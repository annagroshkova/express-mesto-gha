const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const AppError = require('../errors/AppError');

const { JWT_SECRET } = process.env;

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AppError('Неправильные почта или пароль', 401));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new AppError('Неправильные почта или пароль', 401));
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days

    res
      .status(200)
      .cookie('mesto_jwt', token, {
        maxAge,
        httpOnly: true,
      })
      .send({
        token,
      });
  } catch (err) {
    console.log(err);
    return next(new AppError());
  }
};

module.exports.createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = (await User.create({ name, about, avatar, email, password: hash })).toObject({
      useProjection: true,
    });
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return next(new AppError('Пользователь с таким имэйлом уже существует', 409));
    }
    if (err.name === 'ValidationError') {
      return next(new AppError('Ошибка валидации', 400));
    }
    return next(new AppError());
  }
};

module.exports.patchUser = async (req, res, next) => {
  const { _id: userId } = req.user;

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new AppError('Пользователь не найден', 404));
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return next(new AppError('Ошибка валидации', 400));
    }
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', 400));
    }
    return next(new AppError());
  }
};

module.exports.patchUserAvatar = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return next(new AppError('Пользователь не найден', 404));
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return next(new AppError('Ошибка валидации', 400));
    }
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', 400));
    }
    return next(new AppError());
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return next(new AppError());
  }
};

module.exports.getUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.send(user);
    } else {
      return next(new AppError('Пользователь не найден', 404));
    }
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', 400));
    }
    return next(new AppError());
  }
};

module.exports.getMe = async (req, res, next) => {
  const { _id: userId } = req.user;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.send(user);
    } else {
      return next(new AppError('Пользователь не найден', 404));
    }
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', 400));
    }
    return next(new AppError());
  }
};
