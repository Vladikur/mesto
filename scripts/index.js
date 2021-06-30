
const popupProfileRedactElement = document.querySelector('.profile__redact');
const popupElement = document.querySelector('.popup__redact-profile');
const popupExitButtonElement = popupElement.querySelector('.popup__exit-profile');

const popupNameInputElement = popupElement.querySelector('.popup__input_change_name');
const popupDescriptionInputElement = popupElement.querySelector('.popup__input_change_description');
const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const popupFormElement = popupElement.querySelector('.popup__form-profile');

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
const popupCardAddElement = document.querySelector('.profile__add-profile');
const popupCardElement = document.querySelector('.popup__add-cards');
const popupNameCardInputElement = popupCardElement.querySelector('.popup__input_change_name-card');
const popupSrcInputElement = popupCardElement.querySelector('.popup__input_change_src');
const popupFormCardElement = popupCardElement.querySelector('.popup__form-card');
const popupExitCardButtonElement = popupCardElement.querySelector('.popup__exit-card-add');

// Добавление имеющихся карточек на страницу
function renderCard(name, link) {
  const cardElement = cardTamplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__description').textContent = name;
  const renderImage = cardElement.querySelector('.card__image');
  renderImage.src = link;
  renderImage.alt = name;

  // Добавление/убирание лайков
  const likeElement = cardElement.querySelector('.card__like');
  likeElement.addEventListener('click', (evt) => {
    const evtTarget = evt.target
    evtTarget.classList.toggle('card__like_active');
  });

  // Удаление карточки
  const removeElement = cardElement.querySelector('.card__remove');
  removeElement.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  // Реализация открытия и закрытия попапа просмотра изображения
  const imagePopupElement = document.querySelector('.popup__see-photo');
  const openImagePopupElement = cardElement.querySelector('.card__image');
  const closeImagePopupElement = imagePopupElement.querySelector('.popup__exit-see-photo');
  const seeImageElement = imagePopupElement.querySelector('.popup__image-see-photo');
  const seeTextElement = imagePopupElement.querySelector('.popup__text-see-photo');

  const openImagePopup = function() {
    imagePopupElement.classList.add('popup_is-opened');
    seeTextElement.textContent = name;
    seeImageElement.src = link;
  };

  const closeImagePopup = function() {
    imagePopupElement.classList.remove('popup_is-opened');
  };

  openImagePopupElement.addEventListener('click', openImagePopup);
  closeImagePopupElement.addEventListener('click', closeImagePopup);

  return cardElement;
};

initialCards.forEach(function (el) {
  cardsGrid.append(renderCard(el.name, el.link))
});

// Реализация открытия и закрытия попапа добавления карточек
const openCardPopup = function() {
  popupCardElement.classList.add('popup_is-opened');
};

const closeCardPopup = function() {
  popupCardElement.classList.remove('popup_is-opened');
};

// Добавление новой карточки на страницу
function saveNewCard() {
  const name = popupNameCardInputElement.value;
  const link = popupSrcInputElement.value;

  cardsGrid.append(renderCard(name, link));

  popupNameCardInputElement.value = null;
  popupSrcInputElement.value = null;

  closeCardPopup();
}

popupCardAddElement.addEventListener('click', openCardPopup);
popupExitCardButtonElement.addEventListener('click', closeCardPopup);
popupFormCardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveNewCard();
});
