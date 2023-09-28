import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
    authorization: "7ed3bb2f-7b5a-422d-a884-e2fa31c7bd62",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const editAvatarPopup = new PopupWithForm("#modal-edit-avatar", (data) => {
  return api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((error) => {
      console.error(error);
    });
});
editAvatarPopup.setEventListeners();

document
  .querySelector("#profile-image-pencil")
  .addEventListener("click", () => {
    formValidators["edit-avatar-form"].resetValidation();
    editAvatarPopup.open();
  });

const confirmAction = (card, cardId) => {
  return api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
  handleConfirm: confirmAction,
});

deleteCardPopup.setEventListeners();

const iamgePreviewPopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});

let section;

function createCard(item) {
  const cardElement = new Card(
    {
      data: data,
      handleImageClick: (imageData) => {
        iamgePreviewPopup.open(imageData);
      },
      handleDeleteCard: (card, cardId) => {
        deleteCardPopup.open(card, cardId);
      },
      confirmPopup: deleteCardPopup,
      api: api,
    },
    "#card-template"
  );
  return cardElement.getView();
}

const renderCard = (data) => {
  const cardElement = createCard(data);
  section.addItem(cardElement);
};

// const renderCard = (data) => {
//   const cardElement = new Card(
//     {
//       data: data,
//       handleImageClick: (imageData) => {
//         iamgePreviewPopup.open(imageData);
//       },
//       handleDeleteCard: (card, cardId) => {
//         deleteCardPopup.open(card, cardId);
//       },
//       confirmPopup: deleteCardPopup,
//       api: api,
//     },
//     "#card-template"
//   );

//   section.addItem(cardElement.getView());
// };
section = new Section(
  {
    renderer: renderCard,
  },
  cardsListSelector
);

const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  return api
    .addNewCards(data)
    .then((res) => {
      renderCard(res);
    })

    .catch(console.error);
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    section.renderItems(cards);
  })
  .catch((error) => {
    console.error(error);
  });

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

const setEditPopupValues = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.job;
};

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
