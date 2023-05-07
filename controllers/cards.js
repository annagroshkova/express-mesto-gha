const Card = require('../models/cards');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.createCard = async (req, res) => {
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
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }

    await Card.findByIdAndDelete(cardId);
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.likeCard = async (req, res) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.dislikeCard = async (req, res) => {
  const { _id: userId } = req.user;
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.send(card);
  } catch (err) {
    console.log(err);
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
