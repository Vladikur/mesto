const popupProfileRedactElement = document.querySelector('.profile__redact');
const popupElement = document.querySelector('.popup');
const popupExitButtonElement = popupElement.querySelector('.popup__exit');

const popupNameInputElement = popupElement.querySelector('.popup__input_name');
const popupDescriptionInputElement = popupElement.querySelector('.popup__input_description');
const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const popupFormElement = popupElement.querySelector('.popup__form');

const nameAndDescriptionLikeHTML = function() {
  popupNameInputElement.value = nameElement.textContent;
  popupDescriptionInputElement.value = descriptionElement.textContent;
};

const openPopup = function() {
  nameAndDescriptionLikeHTML();
  popupElement.classList.add('popup_is-opened');
};
const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
};

const saveNameAndDescription = function(evt) {
  evt.preventDefault();
  nameElement.textContent = popupNameInputElement.value;
  descriptionElement.textContent = popupDescriptionInputElement.value;
  closePopup ()
};

popupProfileRedactElement.addEventListener('click', openPopup);
popupExitButtonElement.addEventListener('click', closePopup);
popupFormElement.addEventListener('submit', saveNameAndDescription);

