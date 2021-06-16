const popupProfileRedactElement = document.querySelector('.profile__redact');
const popupElement = document.querySelector('.popup');
const popupExitButtonElement = popupElement.querySelector('.popup__exit');

const popupNameInputElement = popupElement.querySelector('.popup__input-name');
const popupDescriptionInputElement = popupElement.querySelector('.popup__input-description');
const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const popupSaveElement = popupElement.querySelector('.popup__save');

const nameAndDescriptionLikeHTML = function() {
popupNameInputElement.value = nameElement.textContent;
popupDescriptionInputElement.value = descriptionElement.textContent;
};

const openPopup = function() {
  nameAndDescriptionLikeHTML();
  popupElement.classList.add('popup_is-opened');
};
const closePopup = function() {
  nameAndDescriptionLikeHTML();
  popupElement.classList.remove('popup_is-opened');
};
popupProfileRedactElement.addEventListener('click', openPopup);
popupExitButtonElement.addEventListener('click', closePopup);

const saveNameAndDescription = function(evt) {
  evt.preventDefault();
  nameElement.textContent = popupNameInputElement.value;
  descriptionElement.textContent = popupDescriptionInputElement.value;
  closePopup ()
};
popupSaveElement.addEventListener('click', saveNameAndDescription);
popupSaveElement.addEventListener('submit', saveNameAndDescription);

popupNameInputElement.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    nameElement.textContent = popupNameInputElement.value;
    closePopup ();
  }
});
popupDescriptionInputElement.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    descriptionElement.textContent = popupDescriptionInputElement.value;
    closePopup ();
  }
});
