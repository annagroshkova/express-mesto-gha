import PopupWithForm from './PopupWithForm.js';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      submitButtonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          id="name"
          name="name"
          placeholder="Имя"
          value={name || ''}
          onChange={e => setName(e.target.value)}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error name-error"></span>
        <input
          className="popup__input popup__input_type_description"
          type="text"
          id="about"
          name="about"
          placeholder="О себе"
          value={description || ''}
          onChange={e => setDescription(e.target.value)}
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error about-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
