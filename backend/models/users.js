const mongoose = require('mongoose');
const validator = require('validator');

const URL_REGEX = /^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*#?$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => URL_REGEX.test(v),
        message: (props) => `${props.value} не является валидным юэрэлом`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: (props) => `${props.value} не является валидным имэйлом`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

const User = mongoose.model('user', userSchema);

module.exports = User;
