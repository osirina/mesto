export default class Card {
    constructor(cardData, templateSelector, handleOpenZoomPopup) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._handleOpenZoomPopup = handleOpenZoomPopup;
    };

    // получить шаблон карточки
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

    return cardElement;
    };

    // добавляем данные
    generateCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.card__image');
        this._cardTitle = this._card.querySelector('.card__title');
        this._cardImage.alt = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardTitle.textContent = this._cardData.name;
        
        this._setEventListeners();
        return this._card;
    };

    // вешаем слушатели
    _setEventListeners() {
        const cardDeleteButton = this._card.querySelector('.card__button-delete');
        this._cardLikeButton = this._card.querySelector('.card__like');

        cardDeleteButton.addEventListener('click', () => { this._handleCardDelete()});
        this._cardLikeButton.addEventListener('click', () => { this._handleCardLike()});

        // просмотр увеличенного изображения
        this._cardImage.addEventListener('click', () => { this._handleImageZoom(this._cardData.name, this._cardData.link); });
    }

    // функция проставления лайка
    _handleCardLike() {
        this._cardLikeButton.classList.toggle('card__like_active')
    }

    // функция удаления карточки
    _handleCardDelete() {
        this._card.remove();
    };

    // функция просмотра увеличенного фото
    _handleImageZoom() {
        this._handleOpenZoomPopup( {name: this._cardData.name, link: this._cardData.link} );
    }

}
