import '../pages/index.css';

// Импорт карточек, констант и валидации
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './Constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
import {
  cardTamplate,
  buttonOpenPopupProfile,
  popupProfile,
  inputNamePopupProfile,
  inputDescriptionPopupProfile,
  nameProfile,
  descriptionProfile,
  formPopupProfile,
  cardsGrid,
  buttonOpenPopupCard,
  popupCard,
  formPopupCard,
  popupImage,
  buttonClosePopupImage,
  formProfileElement,
  formCardElement,
  validationConfig
} from './Constants.js';

// Валидация
const formValidatorProfile = new FormValidator(validationConfig, formProfileElement);
const formValidatorCard = new FormValidator(validationConfig, formCardElement);
formValidatorProfile.enableValidation()
formValidatorCard.enableValidation()

// /Рендер карточек
const defaultCardRender = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTamplate, handleCardClick);
    const cardElement = card.generateCard();
    defaultCardRender.addItem(cardElement);
  }
}, cardsGrid);

defaultCardRender.renderItems()

// Попап с картинками
function handleCardClick(name, link) {
  const popupPlaceView = new PopupWithImage(name, link, popupImage)
  popupPlaceView.open(name, link)
};
const popupPlace = new Popup(popupImage)

// Попап с новой карточкой
function createCard(item) {
  const newcard = [
    {
      name: item.place,
      link: item.url
    }
  ]
  const newCardRender = new Section({
    items: newcard,
    renderer: (item) => {
      const card = new Card(item, cardTamplate, handleCardClick);
      const cardElement = card.generateCard();
      newCardRender.addItem(cardElement, true);
    }
  }, cardsGrid);
  newCardRender.renderItems()
}

const CardElement = new PopupWithForm(popupCard, (item) => {
  createCard(item)
  CardElement.close()
}, formPopupCard);
CardElement.setEventListeners(buttonClosePopupImage)

// Попап с профилем
const nameAndDescriptionLikeHTML = function() {
  inputNamePopupProfile.value = Profileinfo.getUserInfo().name;
  inputDescriptionPopupProfile.value = Profileinfo.getUserInfo().description;
};
const Profileinfo = new UserInfo(nameProfile, descriptionProfile)

const ProfileElement = new PopupWithForm(popupProfile, (item) => {
  Profileinfo.setUserInfo(item)
  ProfileElement.close()
}, formPopupProfile);
ProfileElement.setEventListeners(buttonClosePopupImage)

// Слушатели открытия попапов
popupPlace.setEventListeners(buttonClosePopupImage)
buttonOpenPopupProfile.addEventListener('click', () => {
  nameAndDescriptionLikeHTML();
  ProfileElement.open();
});
buttonOpenPopupCard.addEventListener('click', () => CardElement.open());
