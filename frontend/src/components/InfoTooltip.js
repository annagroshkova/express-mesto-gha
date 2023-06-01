import errorIcon from '../images/error.svg';
import successIcon from '../images/success.svg';

export default function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_register">
        <img className="popup__icon" src={props.isSuccess ? successIcon : errorIcon} />
        <h3 className="popup__heading popup__heading_register">
          {props.isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>

        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
