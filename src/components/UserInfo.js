export default class UserInfo {
  constructor(userName, userDescription, idProfile) {
   this._userName = userName;
   this._userDescription = userDescription;
   this._nameProfile = document.querySelector('.profile__name');
   this._descriptionProfile = document.querySelector('.profile__description');
   this._avatarProfile = document.querySelector('.profile__image');
   this._idProfile = idProfile
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._nameProfile.textContent;
    this._userData.description = this._descriptionProfile.textContent;
    return this._userData;
  }

  setUserInfo(item) {
    if (item.name) {
      this._nameProfile.textContent = item.name
    }
    if (item.description) {
      this._descriptionProfile.textContent = item.description
    }
    if (item.about) {
      this._descriptionProfile.textContent = item.about
    }
    if (item._id) {
      this._idProfile.id = item._id
    }
  }

  setUserAvatar(data) {
    if (data.avatar) {
      this._avatarProfile.src = data.avatar
    }
  }
}
