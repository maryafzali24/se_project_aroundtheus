import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
// import "../pages/index.css";

import {
  initialCards,
  cardsListSelector,
  settings,
  nameInput,
  descriptionInput,
} from "../utils/constants.js";

// import {
//   openPopup,
//   isEscEvent,
//   closePopup,
//   handleOverlay,
// } from "../utils/utils.js";

/* *************************************************************** */
/*                            Elements                              */
/* *************************************************************** */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const imgPreviewModal = document.querySelector("#preview-image-modal");
const imagePreview = imgPreviewModal.querySelector(".modal__image-preview");
const imgpreviewTitle = imgPreviewModal.querySelector(".modal__image-title");
const imgPreviewCloseButton = imgPreviewModal.querySelector(
  "#modal-preview-close-button"
);
const modals = document.querySelectorAll(".modal");

//Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector("#add-card-form");

//Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const modalEditCloseButton =
  profileEditModal.querySelector("#edit-close-button");
const addCardCloseButton = addCardModal.querySelector("#card-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Add new card
const addNewCardButton = document.querySelector(".profile__add-button");

// Form data
const inputName = document.querySelector("#modal-form-name");
const inputDescription = document.querySelector("#modal-form-description");

const addCardTitle = addCardForm.querySelector("#modal-form-title");
const addCardUrl = addCardForm.querySelector("#modal-form-url");

/* ******************************************************************************* */
/*                                 Functions                                       */
/* ******************************************************************************* */

const cardSelector = "#card-template";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  ({ name, description }) => handleEditProfileSubmit(name, description)
);

const addCardPopup = new PopupWithForm("#add-card-modal", ({ title, link }) => {
  handleAddCardSubmit(title, link);
});
const iamgePreviewPopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },

  cardsListSelector
);

/* ----------------------- */
/*     Form Validation     */
/* ----------------------- */
const formValidators = {};
// enable validation
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // here you get the name of the form
    const formName = formElement.getAttribute("name");

    // here you store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

/* ------------------ */
/*      Functions     */
/* ------------------ */

const setEditPopupValues = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = job;
};

const renderCard = (cardData) => {
  const newCard = new Card(
    cardData,
    cardSelector,
    iamgePreviewPopup,
    (title, link) => imgPreviewModal.open(title, link)
  );
  section.addItem(newCard.getView());
};

function handleEditProfileSubmit(name, description) {
  userInfo.setUserInfo({
    name: name,
    job: description,
  });
  editProfilePopup.close();
}

function handleAddCardSubmit(name, link) {
  renderCard({ name: name, link: link });
  addCardPopup.close();
}
// const newCard = createCard(cardData, cardSelector);
// section.addItem(newCard);

// render initialcards
section.renderItems();

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// eneble event listeners in each form
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
iamgePreviewPopup.setEventListeners();

// handle the profile edit popup
profileEditButton.addEventListener("click", () => {
  formValidators["edit-profile-form"].resetValidation();
  setEditPopupValues();
  editProfilePopup.open();
});

//handle the photo add popup
addCardPopup.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  addCardPopup.open();
});
