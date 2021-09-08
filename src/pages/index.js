import './index.css';

// Импорт карточек, констант и валидации
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import {
  buttonOpenPopupProfile,
  popupProfile,
  inputNamePopupProfile,
  inputDescriptionPopupProfile,
  nameProfile,
  descriptionProfile,
  formPopupProfile,
  fotoProfile,
  cardsGrid,
  buttonOpenPopupCard,
  popupCard,
  formPopupCard,
  popupImage,
  formProfileElement,
  formCardElement,
  validationConfig,
  popupDelete,
  formPopupDelete,
  popupAvatar,
  formPopupAvatar,
  buttonAvatar,
  buttonSaveProfile,
  buttonSaveCard,
  buttonSaveAvatar
} from '../units/constants.js';

// Отправка данных профиля на сервер

// Получение данных профиля c сервера
const apiProfileData = new Api({
  url: 'https://nomoreparties.co/v1/cohort-27/users/me'
})
apiProfileData
.getProfileData()
.then (data => {
  nameProfile.textContent = data.name;
  descriptionProfile.textContent = data.about;
  fotoProfile.src = data.avatar;
})

// Валидация
const formValidatorProfile = new FormValidator(validationConfig, formProfileElement);
const formValidatorCard = new FormValidator(validationConfig, formCardElement);
const formValidatorAvatar = new FormValidator(validationConfig, formPopupAvatar);
formValidatorProfile.enableValidation()
formValidatorCard.enableValidation()
formValidatorAvatar.enableValidation()

// Рендер карточек c сервера
function cardRender(item) {
  const card = new Card(item, '.template__card', handleCardClick, apiCardRender, hendleCardDelete);
  return card.generateCard(item);
}

const apiCardRender = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27/cards'
})
apiCardRender
.getInitialCards()
.then (data => {
  const defaultCardRender = new Section({
    items: data,
    renderer: (item) => {
      defaultCardRender.addItem(cardRender(item));
    }
  }, cardsGrid);

  defaultCardRender.renderItems()
})
// Попап с удалением карточки

function hendleCardDelete(item, id) {
  const popupDeleteCard = new PopupDeleteCard(popupDelete, formPopupDelete, () => {
    item.closest('.card').remove();
    apiCardRender.deleteCard(id)
  });
  popupDeleteCard.open();
  popupDeleteCard.setEventListeners(item)
};


// Попап с картинками
const popupPlaceView = new PopupWithImage(popupImage)

function handleCardClick(name, link) {
  popupPlaceView.open(name, link)
};

// Попап с новой карточкой
function createCard(item) {
  const newcard = [
    {
      name: item.place,
      link: item.url,
      likes: [],
      owner: {}
    }
  ]
  newcard.forEach(item => {
    cardsGrid.prepend(cardRender(item));
  });
}

const cardElement = new PopupWithForm(popupCard, (item) => {
  renderLoading(true, buttonSaveCard)
  createCard(item)
  apiCardRender
  .cardCreate({
    name: item.place,
    link: item.url
  }, renderLoading)
  cardElement.close()
}, formPopupCard);
cardElement.setEventListeners()

// Попап с профилем
const nameAndDescriptionLikeHTML = function() {
  inputNamePopupProfile.value = profileinfo.getUserInfo().name;
  inputDescriptionPopupProfile.value = profileinfo.getUserInfo().description;
};
const profileinfo = new UserInfo(nameProfile, descriptionProfile)

const ProfileElement = new PopupWithForm(popupProfile, (item) => {
  renderLoading(true, buttonSaveProfile)
  profileinfo.setUserInfo(item)
  apiProfileData
    .profileRedact({
      name: item.name,
      about: item.description
    }, renderLoading)
  ProfileElement.close()
}, formPopupProfile);
ProfileElement.setEventListeners()

// Попап с аватаркой профиля
const apiAvatar = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27/users/me/avatar'
})
const AvatarElement = new PopupWithForm(popupAvatar, (item) => {
  renderLoading(true, buttonSaveAvatar)
  buttonAvatar.src = item.avatar;
  apiAvatar.avatarRedact(item.avatar, renderLoading)
  AvatarElement.close();
}, formPopupAvatar);
AvatarElement.setEventListeners()

const renderLoading = function(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

// Слушатели открытия попапов
popupPlaceView.setEventListeners()
buttonOpenPopupProfile.addEventListener('click', () => {
  nameAndDescriptionLikeHTML();
  ProfileElement.open();
});
buttonOpenPopupCard.addEventListener('click', () => cardElement.open());
buttonAvatar.addEventListener('click', () => AvatarElement.open());
