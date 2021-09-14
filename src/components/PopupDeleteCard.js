import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, formSelector, deleteCard) {
   super(popupSelector)
   this._formSelector = formSelector
   this._deleteCard = deleteCard
   this._idCard
  }

  getMyCardId(id) {
    this._idCard = id
  }

  setEventListeners() {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this._idCard) {
        this._deleteCard(this._idCard)
      }
    })
    super.setEventListeners();
  }

  close() {
    super.close()
  };
}
