const enableValidation = (selectors) => {
    const forms = Array.from(document.forms); // собираем все формы
    forms.forEach((form) => {
        setEventListener(form, selectors);   
    });
};

const setEventListener = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...restSelectors}) => {
    const inputs = Array.from(document.querySelectorAll(inputSelector)); //собираем все инпуты
    const button = form.querySelector(submitButtonSelector); // находим кнопку
    toggleButtonState(inputs, button, inactiveButtonClass); // делаем кнопку неактивной с самого начала
    
    inputs.forEach((input) => {
        input.addEventListener('input', () => { // вешаем слушатель на ввод, в котором 
            isValid(form, input, restSelectors); // 1) проверяем валидность каждого инпута
            toggleButtonState(inputs, button, inactiveButtonClass); // 2) если хотя бы 1 не валиден - отключаем кнопку
        });
    });
};

const isValid = (form, input, restSelectors) => { // проверяем валидность инпута
    const errorElement = form.querySelector(`.${input.id}-error`); // находим элемент ошибки
    if (!input.validity.valid) {
        showInputError(errorElement, input, restSelectors);
    } else {
        hideInputError(errorElement, input, restSelectors);
    };
};

const showInputError = (form, input, errorMessage, {inputErrorClass}) => { // показываем ошибку
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;

};

const hideInputError = (span, input, {inputErrorClass, errorClass}) => { // скрываем ошибку
    span.classList.remove(errorClass);
    span.textContent = '';
    input.classList.remove(inputErrorClass);
};

const toggleButtonState = (inputs, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
        disableButton(button, inactiveButtonClass);
    } else {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute('disabled');
    };
};

const hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
        return !input.validity.valid
    });
};

const disableButton = (button, inactiveButtonClass) => {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
};

enableValidation(formSelectors);