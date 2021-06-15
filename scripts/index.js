const popupProfileRedactElement = document.querySelector('.profile__redact');
const popupElement = document.querySelector('.popup');
const popupExitButtonElement = popupElement.querySelector('.popup__exit');

const openPopup = function() {
  popupElement.classList.add('popup_is-opened')
};
const closePopup = function() {
  popupElement.classList.remove('popup_is-opened')
};
popupProfileRedactElement.addEventListener('click', openPopup);
popupExitButtonElement.addEventListener('click', closePopup);
