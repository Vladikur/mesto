export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handleCardLike, idProfile) {
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._id = data._id
    this._owner = data.owner
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._handleCardLike = handleCardLike
    this._idProfile = idProfile.id
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  cardDislike() {
    this._element.querySelector('.card__like').classList.remove('card__like_active');
    this._element.querySelector('.card__likes').textContent = this._element.querySelector('.card__likes').textContent - 1;
  }

  cardLike() {
    this._element.querySelector('.card__like').classList.add('card__like_active');
    this._element.querySelector('.card__likes').textContent = Number(this._element.querySelector('.card__likes').textContent) + 1;
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleCardLike(this._id)
    });
    this._element.querySelector('.card__remove').addEventListener('click', () => {
      this._handleCardDelete(this._id);
    });
  }

  _myLike(item) {
    return item._id === "92020d4fdf85f9612685b2c0";
    // при попытке подставить в это сравнение this._idProfile возникает ошибка TypeError: Cannot read property '_idProfile' of undefined. При этом в _basketVisibility() переменная this._idProfile работает. Не могу разобраться как решить эту проблему.
  }

  _likesVisibility() {
    this._element.querySelector('.card__likes').textContent = this._likes.length;
    this._likePresent = this._likes.some(this._myLike);
    if (this._likePresent) {
      this._element.querySelector('.card__like').classList.add('card__like_active');
    }
  }

  _basketVisibility() {
    if (this._owner._id !== this._idProfile) {
      this._element.querySelector('.card__remove').classList.add('card__remove_visibility_hide');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image')

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__description').textContent = this._name;

    this._basketVisibility()
    this._likesVisibility()
    this._setEventListeners()

    return this._element;
  }
}



