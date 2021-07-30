// Импорт карточек и валидации
import Card from './Card.js';
import FormValidator from './FormValidator.js';
// Массив для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
// Переменные для кнопок
const ESC_KEYCODE = 27;
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
const FormValidatorProfile = new FormValidator(validationConfig, formProfileElement);
const FormValidatorCard = new FormValidator(validationConfig, formCardElement);

// Валидация
FormValidatorProfile.enableValidation()
FormValidatorCard.enableValidation()

// Функция заполнения полей
const nameAndDescriptionLikeHTML = function() {
  inputNamePopupProfile.value = nameProfile.textContent;
  inputDescriptionPopupProfile.value = descriptionProfile.textContent;
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

// Функция отправки формы профиля
const submitFormProfile = function(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNamePopupProfile.value;
  descriptionProfile.textContent = inputDescriptionPopupProfile.value;
  closePopup(popupProfile);
};


// Рендеринг карточек
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  cardsGrid.append(cardElement);
});

// Функция добавления новой карточки на страницу
function submitFormNewCard() {
  const newcard = [
    {
      name: `${inputNamePopupCard.value}`,
      link: `${inputScrPopupCard.value}`
    }
  ]
  newcard.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();

    cardsGrid.prepend(cardElement);
  });

  formPopupCard.reset();

  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add("popup__save_inactive");

  closePopup(popupCard);
}

// Функция закрытия попапа на esc
const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.which === ESC_KEYCODE) {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};

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
