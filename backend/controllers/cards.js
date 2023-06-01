const Card = require('../models/cards');
const {
  AppError,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_FORBIDDEN,
} = require('../errors/AppError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    console.log(err);
    return next(new AppError());
  }
};

module.exports.createCard = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, link } = req.body;

  try {
    const card = await Card.create({
      name,
      link,
      owner: userId,
    });
    res.status(201).send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return next(new AppError('Ошибка валидации', STATUS_BAD_REQUEST));
    }
    return next(new AppError());
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return next(new AppError('Карточка не найдена', STATUS_NOT_FOUND));
    }

    if (String(card.owner) !== userId) {
      return next(new AppError('Невозможно удалить чужую карточку', STATUS_FORBIDDEN));
    }

    await Card.findByIdAndDelete(cardId);
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', STATUS_BAD_REQUEST));
    }
    return next(new AppError());
  }
};

module.exports.likeCard = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      return next(new AppError('Карточка не найдена', STATUS_NOT_FOUND));
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', STATUS_BAD_REQUEST));
    }
    return next(new AppError());
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      return next(new AppError('Карточка не найдена', STATUS_NOT_FOUND));
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', STATUS_BAD_REQUEST));
    }
    return next(new AppError());
  }
};
