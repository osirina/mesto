const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error' // модификатор для инпутов при возникновении ошибки
}; //перенести в общий файл потом

const enableValidation = ({formSelectors, ...settings}) => {
    const formList = Array.from(document.forms);
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...settings}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const isValid = (formElement, inputElement, {...settings}) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
      } else {
        hideInputError(formElement, inputElement, settings);
      };
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass)
      } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
      };
};

const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, {inputErrorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
};

enableValidation(formSelectors);
