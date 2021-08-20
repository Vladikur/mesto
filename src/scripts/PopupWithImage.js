import Popup from './Popup.js';
import {
  imagePopupImage,
  textPopupImage
} from './Constants.js';

export default class PopupWithImage extends Popup {
  constructor(viewName, viewLink, popupSelector) {
   super(popupSelector);
   this._name = viewName
   this._link = viewLink
  }
  open() {
    super.open()
    imagePopupImage.src = this._link;
    textPopupImage.textContent = this._name;
    imagePopupImage.alt = this._name;
  }
}
