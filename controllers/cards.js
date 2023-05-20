const Card = require('../models/cards');
const AppError = require('../errors/AppError');

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
    res.status(201).send({ data: card });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return next(new AppError('Ошибка валидации', 400));
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
      return next(new AppError('Карточка не найдена', 404));
    }

    if (String(card.owner) !== userId) {
      return next(new AppError('Невозможно удалить чужую карточку', 403));
    }

    await Card.findByIdAndDelete(cardId);
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', 400));
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
      return next(new AppError('Карточка не найдена', 404));
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', 400));
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
      return next(new AppError('Карточка не найдена', 404));
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new AppError('Переданы некорректные данные', 400));
    }
    return next(new AppError());
  }
};
