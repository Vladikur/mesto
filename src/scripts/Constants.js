export const initialCards = [
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

// Переменные для добавления карточек
export const cardTamplate = document.querySelector('.template__card').content;
// Переменные для рекдактирования профиля
export const buttonOpenPopupProfile = document.querySelector('.profile__redact');
export const popupProfile = document.querySelector('.popup_type_edit');
// Переменные для попапа с профилем
export const inputNamePopupProfile = popupProfile.querySelector('.popup__input_change_name');
export const inputDescriptionPopupProfile = popupProfile.querySelector('.popup__input_change_description');
export const nameProfile = document.querySelector('.profile__name');
export const descriptionProfile = document.querySelector('.profile__description');
export const formPopupProfile = popupProfile.querySelector('.popup__form-profile');
// Переменные для добавления карточек
export const cardsGrid = document.querySelector('.places__cards');
export const buttonOpenPopupCard = document.querySelector('.profile__add-profile');
// Переменные для попапа с карточками
export const popupCard = document.querySelector('.popup_type_add-card');
export const formPopupCard = popupCard.querySelector('.popup__form-card');
// Переменные для попапа с картинками
export const popupImage = document.querySelector('.popup_type_image');
export const imagePopupImage = popupImage.querySelector('.popup__image-see-photo');
export const textPopupImage = popupImage.querySelector('.popup__text-see-photo');
export const buttonClosePopupImage = popupImage.querySelector('.popup__exit-see-photo');
// Переменные для валидации
export const formProfileElement = document.querySelector('.popup__form-profile');
export const formCardElement = document.querySelector('.popup__form-card');
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input-error_active",
  inactiveButtonClass: "popup__save_inactive",
  errorClass: 'popup__input_error_active'
};
