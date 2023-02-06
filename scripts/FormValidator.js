export class FormValidator {
    constructor(formSelectors, formElement) {
        // элемент проверяемой формы
        this._formElement = formElement;
        // объект настроек
        this._formSelector = formSelectors.formSelector;
        this._inputSelector = formSelectors.inputSelector;
        this._submitButtonSelector = formSelectors.submitButtonSelector;
        this._inactiveButtonClass = formSelectors.inactiveButtonClass;
        this._inputErrorClass = formSelectors.inputErrorClass;
    };
    
    // проверяем валидность одного инпута
    _checkInputIsValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
          };  
    };

    // показ ошибки инпута
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
    };

    // скрытие ошибки инпута
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    };

    // проверка валидности всей формы
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // выключение кнопки
    disableButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    // включение кнопки
    enableButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    // переключение стиля кнопки в зависимости от валидности всех инпутов формы
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this.enableButton();
        };
    };

    // вешаем слушатели
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputIsValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    // запуск функции валидации формы
    enableValidation() {
        this._setEventListeners();
    };
}

