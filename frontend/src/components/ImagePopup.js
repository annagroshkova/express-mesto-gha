export default function ImagePopup(props) {
  if (!props.card) return '';

  return (
    <div className={`popup popup_image-preview ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <div className="popup__inner-container">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <p className="popup__undertext">{props.card.name}</p>
        </div>
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
