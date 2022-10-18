// Вынесем все необходимые элементы формы в константы
//const formElement = document.querySelector('.popup__form');
//const formInput = formElement.querySelector('.popup__input');
//const formError = formElement.querySelector(`.${formInput.id}-error`); // Выбираем элемент ошибки на основе уникального класса 




// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      element.classList.add('popup__input_type_error');
    // Показываем сообщение об ошибке
    formError.classList.add('popup__error_visible');
    // Заменим содержимое span с ошибкой на переданный параметр
    formError.textContent = errorMessage;
    formError.classList.add('popup__error_visible');
  };
  
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement) => {
      // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    element.classList.remove('popup__input_type_error');
    // Скрываем сообщение об ошибке
    formError.classList.remove('popup__error_visible');
    // Очистим ошибку
    formError.textContent = '';
  };

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, formInput, formInput.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, formInput);
    }
  };


  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
  const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add('popup__save-button_disabled');
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove('popup__save-button_disabled');
    }
  }; 

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 


const setEventListeners = (formElement) => {
    // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(`.popup__form`));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement)

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
      });
    });
  };

const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation(); 
  
  
  const formSelectors = {
    formSelector: '.popup__form', // форма
    inputSelector: '.popup__input', // инпут
    submitButtonSelector: '.popup__save-button', // кнопка
    inactiveButtonClass: 'popup__save-button_disabled', // неактивное состояние кнопки
    inputErrorClass: 'popup__input_type_error', // спан с ошибкой
    errorClass: 'popup__error_visible' // активный класс спана с ошибкой
}; //перенести в общий файл потом




const isValid = (form, input, restSelectors) => { // проверяем валидность инпута
    const errorElement = form.querySelector(`.${input.id}-error`); // находим элемент ошибки
    if (!input.validity.valid) {
        showInputError(errorElement, input, restSelectors);
    } else {
        hideInputError(errorElement, input, restSelectors);
    };
};



// new 
const enableValidation = ({formSelectors, ...settings}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, ...settings);
  });
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...settings}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
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
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass}) => {
  const errorSpan = formElement.querySelector(`${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorSpan.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, {inputErrorClass}) => {
  const errorSpan = formElement.querySelector(`${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorSpan.textContent = '';
};