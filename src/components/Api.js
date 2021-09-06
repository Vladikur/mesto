import {
  buttonSaveProfile,
  buttonSaveCard,
  buttonSaveAvatar
} from '../units/constants.js';

export default class Api {
  constructor(config) {
    this.url = config.url;
  }

  getProfileData() {
    return fetch(this.url, {
     headers: {
       authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
       method: 'GET',
     }
   })
   .then(res => {
     if (!res.ok) {
       return Promise.reject("Что-то сломалось")
     }
     return res.json()
   })
   .catch(err => console.log(err))
 }

  getInitialCards() {
    return fetch(this.url, {
      headers: {
        authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
        method: 'GET',
      }
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Что-то сломалось")
      }
      return res.json()
    })
    .catch(err => console.log(err))
  }

  profileRedact(data, renderLoading) {
    return fetch(this.url, {
      method: 'PATCH',
      headers: {
        authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Что-то сломалось")
      }
      return res.json()
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, buttonSaveProfile)
    });
  }

  cardCreate(data, renderLoading) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Что-то сломалось")
      }
      return res.json()
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, buttonSaveCard)
    });
  }

  putLikes(id) {
    return fetch(`${this.url}/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
      },
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Что-то сломалось")
      }
      return res.json()
    })
    .catch(err => console.log(err))
  }

  deleteLikes(id) {
    return fetch(`${this.url}/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
      },
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Что-то сломалось")
      }
      return res.json()
    })
    .catch(err => console.log(err))
  }

  deleteCard(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
      },
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Что-то сломалось")
      }
      return res.json()
    })
    .catch(err => console.log(err))
  }

  avatarRedact(data, renderLoading) {
    return fetch(this.url, {
      method: 'PATCH',
      headers: {
        authorization: '947e1a41-7fdd-411e-be19-4441fbe7ac08',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data,
      })
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Что-то сломалось")
      }
      return res.json()
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, buttonSaveAvatar)
    });
  }

}
