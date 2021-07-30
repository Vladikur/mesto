// Переменные для добавления карточек
const cardTamplate = document.querySelector('.template__card').content;
// Переменные для попапа с картинками
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupImage.querySelector('.popup__exit-see-photo');
const imagePopupImage = popupImage.querySelector('.popup__image-see-photo');
const textPopupImage = popupImage.querySelector('.popup__text-see-photo');
// Переменные для кнопок
const ESC_KEYCODE = 27;

export default class Card {
  constructor(data) {
    this._name = data.name
    this._link = data.link
  }

  _getTemplate() {
    const cardElement = cardTamplate
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _handleEscUp(evt) {
    if (evt.which === ESC_KEYCODE) {
      this._handleClosePopup();
    }
  };

  _handleOpenPopup() {
    imagePopupImage.src = this._link;
    textPopupImage.textContent = this._name;
    imagePopupImage.alt = this._name;
    popupImage.classList.add('popup_is-opened');
    document.addEventListener('keyup', (evt) => {
      this._handleEscUp(evt)
    });
  }

  _handleClosePopup() {
    document.removeEventListener('keyup', (evt) => {
      this._handleEscUp(evt)
    });
    imagePopupImage.src = '';
    textPopupImage.textContent = '';
    imagePopupImage.alt = '';
    popupImage.classList.remove('popup_is-opened');
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    buttonClosePopupImage.addEventListener('click', () => {
      this._handleClosePopup();
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
    this._element.querySelector('.card__description').textContent = this._name;

    this._setEventListeners()

    return this._element;
  }
}
