import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formSelector) {
   super(popupSelector);
   this._handleFormSubmit = handleFormSubmit;
   this._formSelector = formSelector;
  }

  _getInputValues() {
    this._inputList = this._formSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {

    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this._formSelector.reset();

    })
    super.setEventListeners();
  }

  close() {
    this._formSelector.reset();
    super.close()
  };
}


