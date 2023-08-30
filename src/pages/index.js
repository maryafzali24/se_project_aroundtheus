import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

import {
  initialCards,
  cardsListSelector,
  settings,
  nameInput,
  descriptionInput,
  addNewCardButton,
  profileEditButton,
} from "../utils/constants.js";

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

/* ----------------------- */
/*      Event Listner      */
/* ----------------------- */
// eneble event listeners in each form
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
iamgePreviewPopup.setEventListeners();

const renderCard = (cardData) => {
  const newCard = new Card(
    cardData,
    cardSelector,
    iamgePreviewPopup,
    (title, link) => iamgePreviewPopup.open(title, link)
  );
  section.addItem(newCard.getView());
};

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
function handleEditProfileSubmit(name, description) {
  console.log(name, description);
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
}

function handleAddCardSubmit(name, link) {
  renderCard({ name: name, link: link });
  addCardPopup.close();
}

const setEditPopupValues = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = job;
};

// render initialcards
section.renderItems();

// handle the profile edit popup
profileEditButton.addEventListener("click", () => {
  formValidators["edit-profile-form"].resetValidation();
  setEditPopupValues();
  editProfilePopup.open();
});

//handle the photo add popup
addNewCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  addCardPopup.open();
});
