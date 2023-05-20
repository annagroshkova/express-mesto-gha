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
      userId: Joi.string().alphanum().length(24).required(),
    },
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: {
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
      avatar: Joi.string().pattern(URL_REGEX).optional(),
      email: Joi.string().email().optional(),
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
