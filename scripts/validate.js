const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass)
    inputElement.classList.add(errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass)
    inputElement.classList.remove(errorClass);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const hasNotValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass, errorClass) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass)
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, inactiveButtonClass, errorClass)
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input-error_active",
  inactiveButtonClass: "popup__save_inactive",
  errorClass: 'popup__input_error_active'
});
