import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, formSelector, deleteCard) {
   super(popupSelector)
   this._formSelector = formSelector
   this._deleteCard = deleteCard
  }

  setEventListeners(id) {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard(id)
    })
    super.setEventListeners();
  }

  close() {
    super.close()
  };
}
