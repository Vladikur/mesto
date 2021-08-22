import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
   super(popupSelector);
   this._imagePopupImage = document.querySelector('.popup__image-see-photo');
   this._textPopupImage = document.querySelector('.popup__text-see-photo');
  }
  open(viewName, viewLink) {
    super.open()
    this._imagePopupImage.src = viewLink;
    this._textPopupImage.textContent = viewName;
    this._imagePopupImage.alt = viewName;
  }
}
