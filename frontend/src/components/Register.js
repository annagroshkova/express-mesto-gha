import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import { useState } from 'react';
import { auth } from '../utils/auth';
import { useForm } from '../hooks/useForm';

export default function Register() {
  const navigate = useNavigate();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(ev) {
    ev.preventDefault();

    auth
      .signup(values)
      .then(() => {
        setSuccess(true);
      })
      .catch(err => {
        console.error(err);
        setSuccess(false);
      })
      .finally(() => {
        setTooltipOpen(true);
      });
  }

  function handlePopupClose() {
    setTooltipOpen(false);
    if (success) {
      navigate('/sign-in');
    }
  }

  return (
    <div className="register">
      <Header linkUrl="/sign-in" linkText="Войти" />

      <div className="register__container">
        <h3 className="register__heading">Регистрация</h3>
        <form className="register__form" name="register-form" onSubmit={handleSubmit}>
          <fieldset className="register__info">
            <input
              className="register__input register__input_type_email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              required
            />
            <input
              className="register__input register__input_type_password"
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleChange}
              value={values.password}
              required
            />
          </fieldset>
          <button className="register__submit-button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__undertext">
          Уже зарегистрированы?{' '}
          <Link className="register__login-link" to="/sign-in">
            Войти
          </Link>
        </p>
      </div>

      <InfoTooltip isOpen={tooltipOpen} isSuccess={success} onClose={handlePopupClose} />
    </div>
  );
}
