import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card(props) {
  const card = /** @type {import("../types").CardObject} */ props.card;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleCardClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      {isOwn && (
        <button
          className="element__trash-icon"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__info">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__likes">
          <button
            className={`element__like-button ${isLiked && 'element__like-button_active'}`}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-amount">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
