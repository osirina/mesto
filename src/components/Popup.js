export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // публичные методы опен и клоуз - отвечают за открытие и закрытие попапов
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose); // слушатель для закрытия попапа esc
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose); // удаляю слушатель для закрытия попапа esc
    }

    // приватный метод _handleEscClose - отвечает за закрытие с помощью эскейп
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
          // закрываю попап
          this.close();
        }
    }

    _handlePopupOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
          this.close();
        };
    }

    // публичный метод setEventListeners - добавляет слушатель клика иконке закрытия 
    // + закрытие по клику на оверлей
    setEventListeners() {
        // навешиваю слушателя на крестики
        this._popup.querySelector('.popup__close-button')
        .addEventListener('click', () => {
          this.close();
        });
    
        // навешиваю слушателя на закрытие попапа по клику на оверлэй
        this._popup.addEventListener('mousedown', (evt) => {
          this._handlePopupOverlayClose(evt);
        });
      }

}