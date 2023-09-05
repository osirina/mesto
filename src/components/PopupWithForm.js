import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    // метод собирает данные всех полей формы
    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input'); // собираю все инпуты
        // создаю пустой объект
        this._formValues = {};
        // собираю данные всех инпутов
        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
        });
        // возвращаю массив с данными всех инпутов
        return this._formValues;

    }


    // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm 
    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        // сбрасываю форму при закрытии
        this._form.reset();
    }

}