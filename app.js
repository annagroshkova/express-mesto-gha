require('dotenv').config();
// Секретный ключ для разработки можно хранить в коде, это не страшно.
process.env.JWT_SECRET = 'f352c2d0b889a96663804401ef4ef34314fe4d801c61b2b0ec8daeb8cb8c3fbe';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, errors, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const AppError = require('./errors/AppError');

const URL_REGEX = /^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*#?$/;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post(
  '/signin',
  celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: {
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
      avatar: Joi.string().pattern(URL_REGEX).optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
  }),
  createUser,
);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => next(new AppError('Путь не найден', 404)));

app.use(errors());

app.use((err, req, res, _next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: message || 'На сервере произошла ошибка' });
});

app.listen(3000);
