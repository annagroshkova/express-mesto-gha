export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h3 className="popup__heading">{props.title}</h3>
        <form
          onSubmit={props.onSubmit}
          name={props.name}
          className={`popup__form popup__form_${props.name}`}
        >
          {props.children}
          <button className="popup__submit-button" type="submit">
            {props.submitButtonTitle}
          </button>
        </form>
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
