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

// Создание класса для работы с данными сервера
const apiMesto = new Api({
  url: 'https://nomoreparties.co/v1/cohort-27',
  auth: '947e1a41-7fdd-411e-be19-4441fbe7ac08'
})

// Валидация
const formValidatorProfile = new FormValidator(validationConfig, formProfileElement);
const formValidatorCard = new FormValidator(validationConfig, formCardElement);
const formValidatorAvatar = new FormValidator(validationConfig, formPopupAvatar);
formValidatorProfile.enableValidation()
formValidatorCard.enableValidation()
formValidatorAvatar.enableValidation()

// Класс для отображения данных о пользователе
const profileinfo = new UserInfo(nameProfile, descriptionProfile, idProfile)

// Получение данных профиля пользователя c сервера
apiMesto
.getProfileData()
.then (data => {
  profileinfo.setUserInfo(data)
  profileinfo.setUserAvatar(data)

  // Рендер карточек c сервера
  apiMesto
  .getInitialCards()
  .then (data => {

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
      };

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
      popupDeleteMyCard.setEventListeners()

      // Функция удаления карточки
      function handleCardDelete(id) {
        popupDeleteMyCard.open();
        popupDeleteMyCard.getMyCardId(id)
      };

      return card.generateCard(item);
    };

    // Клас родставляющий отрендереные карточки в контейнер
    const cardsContainer = new Section({
      renderer: (item) => {
        cardsContainer.addItem(cardRender(item));
      }
    }, cardsGrid);
    cardsContainer.renderItems(data)

    // Попап с новой карточкой
    const popupCardElement = new PopupWithForm(popupCard, (item) => {
      renderLoading(true, buttonSaveCard)

      apiMesto
      .cardCreate({
        name: item.place,
        link: item.url
      })
      .then((data) => {
        cardsContainer.renderNewCard(data)
        popupCardElement.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, buttonSaveCard)
      });

    }, formPopupCard);
    popupCardElement.setEventListeners()

    // Слушатель открытия попапа для создания карточки
    buttonOpenPopupCard.addEventListener('click', () => popupCardElement.open());
  })
  .catch(err => console.log(err))

  // Попап для просмотра изображений
  const popupPlaceView = new PopupWithImage(popupImage)

  // Функция для открытия попапа с изображением
  function handleCardClick(name, link) {
    popupPlaceView.open(name, link)
  };

  // Функция подставления данных пользователя в поля ввода
  const nameAndDescriptionLikeHTML = function() {
    inputNamePopupProfile.value = profileinfo.getUserInfo().name;
    inputDescriptionPopupProfile.value = profileinfo.getUserInfo().description;
  };

  // Попап для редактирования профиля
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

  // Попап для редактирования аватара профиля
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
  buttonAvatar.addEventListener('click', () => popupAvatarElement.open());
})
.catch(err => console.log(err))
