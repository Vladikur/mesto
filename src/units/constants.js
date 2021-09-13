// Переменные для рекдактирования профиля
export const buttonOpenPopupProfile = document.querySelector('.profile__redact');
export const popupProfile = document.querySelector('.popup_type_edit');
// Переменные для попапа с профилем
export const inputNamePopupProfile = popupProfile.querySelector('.popup__input_change_name');
export const inputDescriptionPopupProfile = popupProfile.querySelector('.popup__input_change_description');
export const nameProfile = document.querySelector('.profile__name');
export const descriptionProfile = document.querySelector('.profile__description');
export const formPopupProfile = popupProfile.querySelector('.popup__form-profile');
export const idProfile = {}
// Переменные для добавления карточек
export const cardsGrid = document.querySelector('.places__cards');
export const buttonOpenPopupCard = document.querySelector('.profile__add-profile');
// Переменные для попапа с картинками
export const popupImage = document.querySelector('.popup_type_image');
// Переменные для попапа с карточками
export const popupCard = document.querySelector('.popup_type_add-card');
export const formPopupCard = popupCard.querySelector('.popup__form-card');
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
// Переменные для попапа с удалением
export const popupDelete = document.querySelector('.popup_type_delete-card');
export const formPopupDelete = popupDelete.querySelector('.popup__form-remove');
// Переменные для попапа с аватаром
export const popupAvatar = document.querySelector('.popup_type_add-avatar');
export const formPopupAvatar = popupAvatar.querySelector('.popup__form-avatar');
export const buttonAvatar = document.querySelector('.profile__image');
export const buttonSaveProfile = popupProfile.querySelector('.popup__save_type_profile');
export const buttonSaveCard = popupCard.querySelector('.popup__save_type_card');
export const buttonSaveAvatar = popupAvatar.querySelector('.popup__save_type_avatar');

