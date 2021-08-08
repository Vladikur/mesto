// Переменные для попапа с картинками
const popupImage = document.querySelector('.popup_type_image');
const imagePopupImage = popupImage.querySelector('.popup__image-see-photo');
const textPopupImage = popupImage.querySelector('.popup__text-see-photo');
// Переменные для кнопок
const ESC_KEYCODE = 27;
export const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.which === ESC_KEYCODE) {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};
// Функции открытия и закрытия попапов
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
};
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
};

export default class Card {
  constructor(data, cardTamplate) {
    this._name = data.name
    this._link = data.link
    this._cardTamplate = cardTamplate
  }

  _getTemplate() {
    const cardElement = this._cardTamplate
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _handleOpenPopup() {
    imagePopupImage.src = this._link;
    textPopupImage.textContent = this._name;
    imagePopupImage.alt = this._name;
    openPopup(popupImage)
    document.addEventListener('keyup', handleEscUp)
  }

  _handleClosePopup() {
    imagePopupImage.src = '';
    textPopupImage.textContent = '';
    imagePopupImage.alt = '';
    closePopup(popupImage)
    document.removeEventListener('keyup', handleEscUp);
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._element.querySelector('.card__like').classList.toggle('card__like_active');
    });
    this._element.querySelector('.card__remove').addEventListener('click', () => {
      this._element.closest('.card').remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__description').textContent = this._name;

    this._setEventListeners()

    return this._element;
  }
}
