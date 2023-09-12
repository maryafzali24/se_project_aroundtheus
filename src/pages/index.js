import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "123217ca-a6b2-4680-8ff5-e94e4242346c",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: "profile__image",
});

let section;

const renderCard = (cardData) => {
  const cardElement = new Card(
    {
      data: cardData,
      handleImageClick: (imageData) => {
        iamgePreviewPopup.open(imageData.name, imageData.link);
      },
    },
    "#card-template"
  );
  section.addItem(cardElement.getView());
  // document.querySelector(".cards__list").prepend(cardElement.getView());
};

section = new Section(
  {
    // items: cardData,

    renderer: renderCard,
  },
  cardsListSelector
);

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cards]) => {
    userInfo.setUserInfo(userData);
    section.renderItems(cards);
  }
);

const editProfilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  return api
    .updateUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((error) => {
      console.error(error);
    });
});

const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  return api
    .addNewCards(data)
    .then((res) => {
      renderCard(res);
    })
    .catch((error) => {
      console.error(error);
    });
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
// function handleEditProfileSubmit(name, description) {
//   console.log(name, description);
//   userInfo.setUserInfo(name, description);
//   editProfilePopup.close();
// }

// function handleAddCardSubmit(name, link) {
//   renderCard({ name: name, link: link });
//   addCardPopup.close();
// }

const setEditPopupValues = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.job;
};

// render initialcards
// section.renderItems();

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
