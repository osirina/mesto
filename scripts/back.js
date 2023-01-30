// функция создания карточек
const createCardElement = (cardData) => {
    const cardTemplate = document.querySelector('.card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__button-delete');
    const cardLikeButton = card.querySelector('.card__like');
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    // лайки и удаление
    cardDeleteButton.addEventListener('click', () => {cardDeleteButton.closest('.card').remove()});
    cardLikeButton.addEventListener('click', () => {cardLikeButton.classList.toggle('card__like_active')});
    // открытие увеличенного изображения
    cardImage.addEventListener('click', (event) => {
        popupZoomImage.src = event.target.src;
        popupZoomImage.alt = event.target.alt;
        popupZoomSubtitle.textContent = event.target.alt;
        openPopup(photoZoomPopup);
    });
    return card;
};

//функция помещения новой карточки в верстку:
const renderCard = (cardData, container) => {
    const card = createCardElement(cardData);
    container.prepend(card);
}

// рендерим изначальные карточки
initialCards.forEach(cardData => {renderCard(cardData, cardsList)});


// просмотр увеличенного изображения в классе
this._cardImage.addEventListener('click', (event) => {
    popupZoomImage.src = event.target.src;
    popupZoomImage.alt = event.target.alt;
    popupZoomSubtitle.textContent = event.target.alt;
    openPopup(photoZoomPopup);
});


initialCards.forEach( cardData => {
    const card = new Card(cardData, '.card-template');
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    cardsList.prepend(cardElement); // проверить метод аппенд
  });

// функция, дающая пользователю возможность добавлять карточки
function handleFormAddSubmit (evt) {
    evt.preventDefault(); // отменяем дефолтное событие
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    generateCard();
    closePopup(cardAddPopup);
    evt.target.reset(); // сброс значения инпутов
    // деактивируем кнопку для предотвращения добавления пустой карточки при повторном открытии формы
    const currentButton = cardAddPopup.querySelector(formSelectors.submitButtonSelector);
    const {inactiveButtonClass} = formSelectors;
    disableButton(currentButton, inactiveButtonClass); 
};