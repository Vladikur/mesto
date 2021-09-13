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
  idProfile,
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

const apiMesto = new Api({
  url: 'https://nomoreparties.co/v1/cohort-27'
})


// Получение данных профиля c сервера
apiMesto
.getProfileData()
.then (data => {
  nameProfile.textContent = data.name;
  descriptionProfile.textContent = data.about;
  idProfile.id = data._id;

  profileinfo.setUserAvatar(data)
})
.catch(err => console.log(err))

// Валидация
const formValidatorProfile = new FormValidator(validationConfig, formProfileElement);
const formValidatorCard = new FormValidator(validationConfig, formCardElement);
const formValidatorAvatar = new FormValidator(validationConfig, formPopupAvatar);
formValidatorProfile.enableValidation()
formValidatorCard.enableValidation()
formValidatorAvatar.enableValidation()


// Функция для рендера карточек
function cardRender(item) {
  const card = new Card(item, '.template__card', handleCardClick, handleCardDelete, handleCardlike, idProfile);

  // Функция постановки лайка карточке
  function handleCardlike(id) {
    if (this._element.querySelector('.card__like').classList.contains('card__like_active')) {
      apiMesto
      .deleteLikes(id)
      .then(() => {
        card.cardDislike()
      })
      .catch(err => console.log(err))
    } else {
      apiMesto
      .putLikes(id)
      .then(() => {
        card.cardLike()
      })
      .catch(err => console.log(err))
    }
  }

  // Попап с удалением карточки
  const popupDeleteMyCard = new PopupDeleteCard(popupDelete, formPopupDelete, (id) => {
    apiMesto
    .deleteCard(id)
    .then(() => {
      card.deleteCard()
      popupDeleteMyCard.close();
    })
    .catch(err => console.log(err))
  })

  // Функция удаления карточки
  function handleCardDelete(id) {
    popupDeleteMyCard.open();
    popupDeleteMyCard.setEventListeners(id)
  };



  // function handleCardDelete(id) {

  //   const popupDeleteMyCard = new PopupDeleteCard(popupDelete, formPopupDelete, () => {
  //     apiMesto
  //     .deleteCard(id)
  //     .then(() => {
  //       card.deleteCard()
  //       popupDeleteMyCard.close();
  //     })
  //     .catch(err => console.log(err))
  //   });

  //   popupDeleteMyCard.open();
  //   popupDeleteMyCard.setEventListeners()
  // };



  return card.generateCard(item);
}

// Рендер карточек c сервера
apiMesto
.getInitialCards()
.then (data => {
  const cardsContainer = new Section({
    items: data,
    renderer: (item) => {
      cardsContainer.addItem(cardRender(item));
    }
  }, cardsGrid);

  cardsContainer.renderItems()
})
.catch(err => console.log(err))

// Попап с картинками
const popupPlaceView = new PopupWithImage(popupImage)

// Функция для открытия попапа с картинкой
function handleCardClick(name, link) {
  popupPlaceView.open(name, link)
};

// Функция для создания новой карточки
function createCard(data) {
  const newcard = [
    {
      name: data.name,
      link: data.link,
      likes: [],
      owner: {
        _id: data.owner._id
      }
    }
  ]

  const cardsContainer = new Section({
    items: newcard,
    renderer: (item) => {
      cardsContainer.addItem(cardRender(item), true);
    }
  }, cardsGrid);

  cardsContainer.renderItems()
}

// Попап с новой карточкой
const popupCardElement = new PopupWithForm(popupCard, (item) => {
  renderLoading(true, buttonSaveCard)

  apiMesto
  .cardCreate({
    name: item.place,
    link: item.url
  })
  .then((data) => {
    createCard(data)
    popupCardElement.close()
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, buttonSaveCard)
  });

}, formPopupCard);
popupCardElement.setEventListeners()

// Функция подставления данных пользователя в поля ввода
const nameAndDescriptionLikeHTML = function() {
  inputNamePopupProfile.value = profileinfo.getUserInfo().name;
  inputDescriptionPopupProfile.value = profileinfo.getUserInfo().description;
};

// Попап с получением данных пользователя
const profileinfo = new UserInfo(nameProfile, descriptionProfile)

// Попап с профилем
const popupProfileElement = new PopupWithForm(popupProfile, (item) => {
  renderLoading(true, buttonSaveProfile)

  apiMesto
  .profileRedact({
    name: item.name,
    about: item.description
  })
  .then(() => {
    profileinfo.setUserInfo(item)
    popupProfileElement.close()
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, buttonSaveProfile)
  });

}, formPopupProfile);
popupProfileElement.setEventListeners()

// Попап с аватаркой профиля
const popupAvatarElement = new PopupWithForm(popupAvatar, (item) => {
  renderLoading(true, buttonSaveAvatar)

  apiMesto
  .avatarRedact(item.avatar)
  .then(() => {
    profileinfo.setUserAvatar(item)
    popupAvatarElement.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, buttonSaveAvatar)
  });


}, formPopupAvatar);
popupAvatarElement.setEventListeners()

// Функция изменения кнопки сохранения формы при отправки данных на сервер
const renderLoading = function(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
    button.classList.remove("popup__save_inactive");
  } else {
    button.textContent = 'Сохранить'
    button.classList.add("popup__save_inactive");
  }
}

// Слушатели открытия попапов
popupPlaceView.setEventListeners()
buttonOpenPopupProfile.addEventListener('click', () => {
  nameAndDescriptionLikeHTML();
  popupProfileElement.open();
});
buttonOpenPopupCard.addEventListener('click', () => popupCardElement.open());
buttonAvatar.addEventListener('click', () => popupAvatarElement.open());
