const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, patchUser, patchUserAvatar, getMe } = require('../controllers/users');

const URL_REGEX = /^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*#?$/;

router.get('/', getUsers);

router.get('/me', getMe);

router.get(
  '/:userId',
  celebrate({
    params: {
      userId: Joi.string().hex().length(24).required(),
    },
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: {
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    },
  }),
  patchUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: {
      avatar: Joi.string().pattern(URL_REGEX).required(),
    },
  }),
  patchUserAvatar,
);

module.exports = router;
