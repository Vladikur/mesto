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
const cardTamplate = document.querySelector('.template__card').content;
const cardsGrid = document.querySelector('.places__cards');
const buttonOpenPopupCard = document.querySelector('.profile__add-profile');
// Переменные для попапа с карточками
const popupCard = document.querySelector('.popup_type_add-card');
const inputNamePopupCard = popupCard.querySelector('.popup__input_change_name-card');
const inputScrPopupCard = popupCard.querySelector('.popup__input_change_src');
const formPopupCard = popupCard.querySelector('.popup__form-card');
const buttonClosePopupCard = popupCard.querySelector('.popup__exit-card-add');
// Переменные для попапа с картинками
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupImage.querySelector('.popup__exit-see-photo');
const imagePopupImage = popupImage.querySelector('.popup__image-see-photo');
const textPopupImage = popupImage.querySelector('.popup__text-see-photo');

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

// Добавление имеющихся карточек на страницу
function renderCard(name, link) {
  const card = cardTamplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__description').textContent = name;
  const imageCard = card.querySelector('.card__image');
  imageCard.src = link;
  imageCard.alt = name;

  // Добавление/убирание лайков
  const buttonLikeCard = card.querySelector('.card__like');
  buttonLikeCard.addEventListener('click', (evt) => {
    const evtTarget = evt.target
    evtTarget.classList.toggle('card__like_active');
  });

  // Удаление карточки
  const buttonRemoveCard = card.querySelector('.card__remove');
  buttonRemoveCard.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  // Реализация открытия попапа просмотра изображения
  const buttonOpenPopupImage = card.querySelector('.card__image');
  const openImagePopup = function() {
    textPopupImage.textContent = name;
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    openPopup(popupImage);
  };
  buttonOpenPopupImage.addEventListener('click', openImagePopup);

  return card;
};

initialCards.forEach(function (el) {
  cardsGrid.append(renderCard(el.name, el.link))
});

// Функция добавления новой карточки на страницу
function submitFormNewCard() {
  const name = inputNamePopupCard.value;
  const link = inputScrPopupCard.value;

  cardsGrid.prepend(renderCard(name, link));

  formPopupCard.reset();

  closePopup(popupCard);
}

// Функция закрытия попапа на esc
const handleEscUp = (evt) => {
  evt.preventDefault();
  if (evt.which === 27) {
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
