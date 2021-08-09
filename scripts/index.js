// Импорт карточек и валидации
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './Constants.js';

// Переменные для кнопок
const ESC_KEYCODE = 27;
// Переменные для добавления карточек
const cardTamplate = document.querySelector('.template__card').content;
// Переменные для рекдактирования профиля
const buttonOpenPopupProfile = document.querySelector('.profile__redact');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__exit-profile');
// Переменные для попапа с профилем
const inputNamePopupProfile = popupProfile.querySelector('.popup__input_change_name');
const inputDescriptionPopupProfile = popupProfile.querySelector('.popup__input_change_description');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const formPopupProfile = popupProfile.querySelector('.popup__form-profile');
// Переменные для добавления карточек
const cardsGrid = document.querySelector('.places__cards');
const buttonOpenPopupCard = document.querySelector('.profile__add-profile');
// Переменные для попапа с карточками
const popupCard = document.querySelector('.popup_type_add-card');
const buttonElement = popupCard.querySelector('.popup__save');
const inputNamePopupCard = popupCard.querySelector('.popup__input_change_name-card');
const inputScrPopupCard = popupCard.querySelector('.popup__input_change_src');
const formPopupCard = popupCard.querySelector('.popup__form-card');
const buttonClosePopupCard = popupCard.querySelector('.popup__exit-card-add');
// Переменные для попапа с картинками
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupImage.querySelector('.popup__exit-see-photo');

// Переменные для валидации
const formProfileElement = document.querySelector('.popup__form-profile');
const formCardElement = document.querySelector('.popup__form-card');
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input-error_active",
  inactiveButtonClass: "popup__save_inactive",
  errorClass: 'popup__input_error_active'
};
const formValidatorProfile = new FormValidator(validationConfig, formProfileElement);
const formValidatorCard = new FormValidator(validationConfig, formCardElement);
// Валидация
formValidatorProfile.enableValidation()
formValidatorCard.enableValidation()
// Функциz закрытия попапов на "esc"
const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.which === ESC_KEYCODE) {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};
// Функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
};
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
};
// Функция заполнения полей
const nameAndDescriptionLikeHTML = function() {
  inputNamePopupProfile.value = nameProfile.textContent;
  inputDescriptionPopupProfile.value = descriptionProfile.textContent;
};

// Функция отправки формы профиля
const submitFormProfile = function(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNamePopupProfile.value;
  descriptionProfile.textContent = inputDescriptionPopupProfile.value;
  closePopup(popupProfile);
};

// Функция рендера карточек
function cardRender(array, isFromStart = false) {
  array.forEach((item) => {
    const card = new Card(item, cardTamplate, openPopup);
    const cardElement = card.generateCard();

    if (isFromStart) {
      cardsGrid.prepend(cardElement);
      return;
    }
    cardsGrid.append(cardElement);
  });
}

cardRender(initialCards);

// Функция добавления новой карточки на страницу
function submitFormNewCard() {
  const newcard = [
    {
      name: `${inputNamePopupCard.value}`,
      link: `${inputScrPopupCard.value}`
    }
  ]
  cardRender(newcard, true);

  formPopupCard.reset();

  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add("popup__save_inactive");

  closePopup(popupCard);
}



// Функции закрытия попапа по оверлей
popupProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit')) {
    closePopup(popupProfile);
  }
});
popupCard.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit')) {
    closePopup(popupCard);
  }
});
popupImage.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit')) {
    closePopup(popupImage);
  }
});

// Редактирование профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  nameAndDescriptionLikeHTML();
  openPopup(popupProfile);
});
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
formPopupProfile.addEventListener('submit', submitFormProfile);

// Редактирование карточек
buttonOpenPopupCard.addEventListener('click', () => openPopup(popupCard));
buttonClosePopupCard.addEventListener('click', () => {
  formPopupCard.reset();
  closePopup(popupCard);
});
formPopupCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormNewCard();
});
// Закрытие картинок
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));
