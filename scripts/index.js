const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* *************************************************************** */
/*                            Elements                              */
/* *************************************************************** */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalEditCloseButton = profileEditModal.querySelector(
  ".modal__close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector("#modal-form-name");
const inputDescription = document.querySelector("#modal-form-description");
const profileForm = document.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* ******************************************************************************* */
/*                                 Functions                                       */
/* ******************************************************************************* */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  //  clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  //  access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  //set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  //set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  //return the ready HTML element with the filled-in datafunction closePopup() {
  return cardElement;
}

function openPopup() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

/* ******************************************************************************* */
/*                                 Event Handlers                                  */
/* ******************************************************************************* */

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

/* ******************************************************************************* */
/*                                 Event Listeners                                 */
/* ******************************************************************************* */

profileEditButton.addEventListener("click", openPopup);

modalEditCloseButton.addEventListener("click", closePopup);

profileForm.addEventListener("submit", handleFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
