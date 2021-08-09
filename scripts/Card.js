// Переменные для попапа с картинками
const popupImage = document.querySelector('.popup_type_image');
const imagePopupImage = popupImage.querySelector('.popup__image-see-photo');
const textPopupImage = popupImage.querySelector('.popup__text-see-photo');

export default class Card {
  constructor(data, cardTamplate, openPopup) {
    this._name = data.name
    this._link = data.link
    this._cardTamplate = cardTamplate
    this._openPopup = openPopup
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
    this._openPopup(popupImage)
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
    this._cardImage = this._element.querySelector('.card__image')

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__description').textContent = this._name;

    this._setEventListeners()

    return this._element;
  }
}
