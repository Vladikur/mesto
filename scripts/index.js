
const popupProfileRedactElement = document.querySelector('.profile__redact');
const popupElement = document.querySelector('.popup');
const popupExitButtonElement = popupElement.querySelector('.popup__exit');

const popupNameInputElement = popupElement.querySelector('.popup__input_change_name');
const popupDescriptionInputElement = popupElement.querySelector('.popup__input_change_description');
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

const cardTamplate = document.querySelector('.template__card').content;
const cardsGrid = document.querySelector('.places__cards')




function renderCard(name, link) {
  const cardElement = cardTamplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__description').textContent = name;
  const renderImage = cardElement.querySelector('.card__image');
  renderImage.src = link;
  renderImage.alt = name;

  return cardElement;
};

initialCards.forEach(function (el) {
  cardsGrid.append(renderCard(el.name, el.link))
});
