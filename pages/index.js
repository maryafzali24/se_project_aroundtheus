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
  cardListSelector,
  cardData,
  validationSettings,
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

// const card = new Card(cardData, cardSelector);
// card.getView();

/*******************************Form Validation*************************** */

// function renderCard(cardData, wrapper) {
//   const card = new Card(cardData, cardSelector);
//   wrapper.prepend(card.getView());
// }

const editProfilePopup = new PopupWithForm("#profile-edit-modal");
editProfilePopup.setEventListeners();
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      //   const card = createCard(cardData);
      //   cardsList.addItem(card);
      // },
      const card = new Card(cardData, cardSelector, imagePreviewPopup);
      cardsList.addItem(card.getView());
    },
  },
  cardListSelector
);
cardsList.renderItems();

const userInfo = new UserInfo(profileTitle, profileDescription);

const editFormValidator = new FormValidator(validationSettings, profileForm);
// editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardForm);
addFormValidator.enableValidation();

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imgPreviewModal.setEventListeners();

function handleImageClick(data) {
  imgPreviewModal.open(data);
}
// function createCard(cardData) {
//   const card = new Card(cardData, cardSelector);
//   return card.getView();
// }
// /* ******************************************************************************* */
// /*                                 Event Handlers                                  */
// /* ******************************************************************************* */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  userInfo.setUserInfo(data.name, data.job);
  evt.target.reset();
  profileEditModal.close();
  editFormValidator.toggleButtonState();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitle.value;
  const link = addCardUrl.value;
  renderCard({ name, link }, cardsWrap);
  evt.target.reset();
  addFormValidator.toggleButtonState();
  addCardModal.close();
}

/* ******************************************************************************* */
/*                                 Event Listeners                                 */
/* ******************************************************************************* */

// Form listners
profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent.trim();
  inputDescription.value = profileDescription.textContent.trim();
  profileEditModal.open();
});

modalEditCloseButton.addEventListener("click", () => profileEditModal.close());

//add new card button
addNewCardButton.addEventListener("click", () => addCardModal.open());

addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

imgPreviewCloseButton.addEventListener("click", () => imgPreviewModal.close());

// initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", handleOverlay);
// });
