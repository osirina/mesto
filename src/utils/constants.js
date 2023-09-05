export const content = document.querySelector('.page__content');

// попапы
export const profileEditPopup = document.querySelector('.popup_type_edit-profile');
//export const cardAddPopup = document.querySelector('.popup_type_add');
//export const photoZoomPopup = document.querySelector('.popup_type_zoom');

// кнопки открытия попапов
export const profileEditButton = content.querySelector('.profile__edit-button');
export const cardAddButton = content.querySelector('.profile__add-button');

// кнопки закрытия попапов
//export const closeEditPopupButton = profileEditPopup.querySelector('.popup__close-button');
//export const closeAddPopupButton = cardAddPopup.querySelector('.popup__close-button');
//export const closeZoomPopupButton = photoZoomPopup.querySelector('.popup__close-button');

// переменные для формы редактирования
export const profileName = content.querySelector('.profile__name');
export const profileJob = content.querySelector('.profile__job');

export const formProfileEdit = profileEditPopup.querySelector('.popup__edit-form');
export const nameInput = profileEditPopup.querySelector('.popup__input_type_name');
export const jobInput = profileEditPopup.querySelector('.popup__input_type_job');

//const popupZoomImage = document.querySelector('.popup__image');
//export const popupZoomSubtitle = document.querySelector('.popup__subtitle');

export const cardNameInput = document.querySelector('.popup__input_type_card-name');
export const cardLinkInput = document.querySelector('.popup__input_type_card-link');
export const formAddPhoto = document.querySelector('.popup__add-form');

//export const closeButtons = document.querySelectorAll('.popup__close-button');
//export const cardsList = document.querySelector('.cards__list'); //контейнер, куда будут рендериться карточки



export const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error' // модификатор для инпутов при возникновении ошибки
};