export default class Api {
  constructor(config) {
    this.url = config.url;
    this.authorization = '947e1a41-7fdd-411e-be19-4441fbe7ac08'
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileData() {
    return fetch(`${this.url}/users/me`, {
     headers: {
       authorization: this.authorization,
       method: 'GET',
     }
   })
   .then(res => this._getResponseData(res))
 }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.authorization,
        method: 'GET',
      }
    })
    .then(res => this._getResponseData(res))
  }

  profileRedact(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._getResponseData(res))
  }

  cardCreate(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._getResponseData(res))
  }

  putLikes(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization,
      },
    })
    .then(res => this._getResponseData(res))
  }

  deleteLikes(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
    .then(res => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
    .then(res => this._getResponseData(res))
  }

  avatarRedact(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data,
      })
    })
    .then(res => this._getResponseData(res))
  }

}
