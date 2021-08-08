export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector
    this._inputSelector = validationConfig.inputSelector
    this._submitButtonSelector = validationConfig.submitButtonSelector
    this._inputErrorClass = validationConfig.inputErrorClass
    this._inactiveButtonClass = validationConfig.inactiveButtonClass
    this._errorClass = validationConfig.errorClass
    this._formElement = formElement
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    this._inputList = Array.from( this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError = (inputElement) => {
    const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
    const errorMessage = inputElement.validationMessage;
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorClass);
  };

  _checkInputValidity = (inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      this._showInputError(inputElement)
      inputElement.classList.add(this._errorClass);
    } else {
      this._hideInputError(inputElement)
      inputElement.classList.remove(this._errorClass);
    }
  };

  _toggleButtonState = () => {
    const hasNotValidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasNotValidInput) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners = () => {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(this._inputList);
      });
    });
    this._toggleButtonState(this._inputList);
  };

  enableValidation = () => {
    this._setEventListeners()
  };
}
