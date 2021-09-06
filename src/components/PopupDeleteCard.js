import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, formSelector, deleteCard) {
   super(popupSelector)
   this._formSelector = formSelector
   this._deleteCard = deleteCard
  }

  setEventListeners() {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard();
      super.close()
    })
    super.setEventListeners();
  }
}
