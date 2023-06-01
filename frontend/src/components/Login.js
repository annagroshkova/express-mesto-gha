import Header from './Header';
import { auth } from '../utils/auth';
import { useForm } from '../hooks/useForm';

export default function Login(props) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    // email: 'anna.matvyeyenko@gmail.com',
    // password: '12345678',
  });

  function handleSubmit(ev) {
    ev.preventDefault();

    auth
      .signin(values)
      .then(res => {
        props.onLogin(res);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="register">
      <Header linkUrl="/sign-up" linkText="Регистрация" />

      <div className="register__container">
        <h3 className="register__heading">Вход</h3>
        <form className="register__form" name="register-form" onSubmit={handleSubmit}>
          <fieldset className="register__info">
            <input
              className="register__input register__input_type_email"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              required
            />
            <input
              className="register__input register__input_type_password"
              type="password"
              name="password"
              placeholder="Пароль"
              value={values.password}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button className="register__submit-button" type="submit">
            Войти
          </button>
        </form>
        <p className="register__undertext">&nbsp;</p>
      </div>
    </div>
  );
}
