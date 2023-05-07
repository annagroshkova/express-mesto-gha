const User = require('../models/users');

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.patchUser = async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.patchUserAvatar = async (req, res) => {
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
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
