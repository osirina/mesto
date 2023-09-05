import './index.css';
import Card from '../components/Card.js';
import { initialCards } from '../utils/initial-cards.js'
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import { profileEditButton, 
  cardAddButton, 
  profileName, 
  profileJob, 
  formProfileEdit, 
  nameInput, 
  jobInput,
  cardNameInput,
  cardLinkInput,
  formAddPhoto,
  formSelectors
} from '../utils/constants.js';


// валидация формы редактирования профиля
const formProfileEditValidation = new FormValidator(formSelectors, formProfileEdit);
formProfileEditValidation.enableValidation();

// валидация формы добавления карточки
const formAddPhotoValidation = new FormValidator(formSelectors, formAddPhoto);
formAddPhotoValidation.enableValidation();

// функция просмотра увеличенного изображения
function handleCardClick (name, link) {
  popupZoomImages.open(name, link);
}

const popupZoomImages = new PopupWithImage('.popup_type_zoom');
popupZoomImages.setEventListeners();


// функция создания карточки
function createCard (cardData) {
  const newCard = new Card(cardData, '.card-template', handleCardClick);
  return newCard.generateCard();
}

// отрисовываем карточки по умолчанию
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards__list');

cardList.renderItems();

function handleAddFormSubmit () {
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  cardList.addItem(createCard(cardData));
  popupAddPlace.close();
  // деактивируем кнопку для предотвращения добавления пустой карточки при повторном открытии формы
  formAddPhotoValidation.disableButton();

}

// попап добавления карточки
const popupAddPlace = new PopupWithForm( '.popup_type_add', handleAddFormSubmit);
popupAddPlace.setEventListeners();

// открытие попапа добавления карточки
cardAddButton.addEventListener('click', () => {
  popupAddPlace.open();
});

function handleSubmitEditForm() {
  userInfo.setUserInfo({
    name: nameInput.value,
    job: jobInput.value
  });
  userInfoEditPopup.close();
  formProfileEditValidation.disableButton();
}

const userInfo = new UserInfo(profileName, profileJob);
const userInfoEditPopup = new PopupWithForm( '.popup_type_edit-profile', handleSubmitEditForm);
userInfoEditPopup.setEventListeners();

// открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
  userInfoEditPopup.open();
});