const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, deleteCard, createCard, likeCard, dislikeCard } = require('../controllers/cards');

const URL_REGEX = /^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*#?$/;

router.get('/', getCards);

router.delete(
  '/:cardId',
  celebrate({
    params: {
      cardId: Joi.string().hex().length(24).required(),
    },
  }),
  deleteCard,
);

router.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(URL_REGEX).required(),
    },
  }),
  createCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().hex().length(24).required(),
    },
  }),
  likeCard,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().hex().length(24).required(),
    },
  }),
  dislikeCard,
);

module.exports = router;
