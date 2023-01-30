import Card from './Card.js';
import { initialCards } from './initial-cards.js'
const content = document.querySelector('.page__content');

// попапы
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const cardAddPopup = document.querySelector('.popup_type_add');
const photoZoomPopup = document.querySelector('.popup_type_zoom');

// кнопки открытия попапов
const profileEditButton = content.querySelector('.profile__edit-button');
const cardAddButton = content.querySelector('.profile__add-button');

// кнопки закрытия попапов
const closeEditPopupButton = profileEditPopup.querySelector('.popup__close-button');
const closeAddPopupButton = cardAddPopup.querySelector('.popup__close-button');
const closeZoomPopupButton = photoZoomPopup.querySelector('.popup__close-button');

// переменные для формы редактирования
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

const formProfileEdit = profileEditPopup.querySelector('.popup__edit-form');
const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
const jobInput = profileEditPopup.querySelector('.popup__input_type_job');

const popupZoomImage = document.querySelector('.popup__image');
const popupZoomSubtitle = document.querySelector('.popup__subtitle');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');
const formAddPhoto = document.querySelector('.popup__add-form');

const closeButtons = document.querySelectorAll('.popup__close-button');
const cardsList = document.querySelector('.cards__list'); //контейнер, куда будут рендериться карточки

//функция открытия попапов
const openPopup = function(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener('mousedown', closePopupByClick); // слушатель для закрытия попапа кликом на оверлей
    document.addEventListener('keydown', closePopupByEsc); // слушатель для закрытия попапа esc
};

//функция закрытия попапов
const closePopup = function(popup) {
    popup.classList.remove('popup_opened');
    window.removeEventListener('mousedown', closePopupByClick); // удаляем слушатель для закрытия попапа кликом на оверлей
    document.removeEventListener('keydown', closePopupByEsc); // удаляем слушатель для закрытия попапа esc
};

// закрытие попапов
closeButtons.forEach((button) => {
  // ближайший к крестику попап 
  const popup = button.closest('.popup');
  // обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// открытие попапа редактирования + подстановка данных профиля в форму при открытии попапа редактирования
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;    
    openPopup(profileEditPopup);
});

// открытие попапа добавления карточки
cardAddButton.addEventListener('click', () => {openPopup(cardAddPopup);});

// функция подстановки данных из формы редактирования в профиль
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // отменяем дефолтное событие
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profileEditPopup);
}

// слушатель кнопки сохранения данных в форме
formProfileEdit.addEventListener('submit', handleProfileFormSubmit); 


// функция просмотра увеличенного изображения
function handleOpenZoomPopup (name, link) {
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    popupZoomSubtitle.textContent = name;
    openPopup(photoZoomPopup);
}


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
    const card = new Card(cardData, '.card-template');
    const cardElement = card.generateCard();
    // Добавляем в DOM
    cardsList.prepend(cardElement);
    closePopup(cardAddPopup);
    evt.target.reset(); // сброс значения инпутов
    // деактивируем кнопку для предотвращения добавления пустой карточки при повторном открытии формы
    const currentButton = cardAddPopup.querySelector(formSelectors.submitButtonSelector);
    const {inactiveButtonClass} = formSelectors;
    disableButton(currentButton, inactiveButtonClass); 
};

// слушатель на форму добавления
formAddPhoto.addEventListener('submit', handleFormAddSubmit); 

// закрытие попапа кликом на оверлей
const closePopupByClick = (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(evt.target);
    };
};

// закрытие попапа esc
const closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
    };
};