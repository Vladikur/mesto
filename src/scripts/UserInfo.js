export default class UserInfo {
  constructor(userName, userDescription) {
   this._userName = userName;
   this._userDescription = userDescription;
   this._nameProfile = document.querySelector('.profile__name');
   this._descriptionProfile = document.querySelector('.profile__description');
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
  }
}
