import './index.css';

// Импорт карточек, констант и валидации
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../units/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import {
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
  formProfileElement,
  formCardElement,
  validationConfig
} from '../units/constants.js';


// Валидация
const formValidatorProfile = new FormValidator(validationConfig, formProfileElement);
const formValidatorCard = new FormValidator(validationConfig, formCardElement);
formValidatorProfile.enableValidation()
formValidatorCard.enableValidation()

// /Рендер карточек
function cardRender(item) {
  const card = new Card(item, '.template__card', handleCardClick);
  return card.generateCard(item);
}

const defaultCardRender = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardRender.addItem(cardRender(item));
  }
}, cardsGrid);

defaultCardRender.renderItems()

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
      link: item.url
    }
  ]
  newcard.forEach(item => {
    cardsGrid.prepend(cardRender(item));
  });
}

const cardElement = new PopupWithForm(popupCard, (item) => {
  createCard(item)
  cardElement.close()
}, formPopupCard);
cardElement.setEventListeners()

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
ProfileElement.setEventListeners()

// Слушатели открытия попапов
popupPlaceView.setEventListeners()
buttonOpenPopupProfile.addEventListener('click', () => {
  nameAndDescriptionLikeHTML();
  ProfileElement.open();
});
buttonOpenPopupCard.addEventListener('click', () => cardElement.open());
