const content = document.querySelector('.page__content');
const popup = document.querySelector('.popup');
const profileEditButton = content.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button');

let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__job');

let formElement = popup.querySelector('.popup__edit-form');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');

function openPopup () {
    popup.classList.add('popup_opened');
};

function closePopup () {
    popup.classList.remove('popup_opened');
};

profileEditButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;    
    popupOpen();
});

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler); 

