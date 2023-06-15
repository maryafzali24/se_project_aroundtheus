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
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const imgPreviewModal = document.querySelector("#preview-image-modal");
const imagePreview = imgPreviewModal.querySelector(".modal__image-preview");
const imgpreviewTitle = imgPreviewModal.querySelector(".modal__image-title");
const imgPreviewCloseButton = imgPreviewModal.querySelector(
  "#modal-preview-close-button"
);

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

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  //  clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  //  access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  //set the card title to the name field of the object, too
  cardTitleEl.textContent = data.name;
  //set the path to the image to the link field of the object
  cardImageEl.src = data.link;
  //set the image alt text to the name field of the object
  cardImageEl.alt = data.name;
  //return the ready HTML element with the filled-in datafunction closePopup() {
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  // access delte button
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    imagePreview.src = data.link;
    imagePreview.alt = data.name;
    imgpreviewTitle.textContent = data.name;
    openPopup(imgPreviewModal);
  });

  return cardElement;
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/* ******************************************************************************* */
/*                                 Event Handlers                                  */
/* ******************************************************************************* */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitle.value;
  const link = addCardUrl.value;
  renderCard({ name, link }, cardsWrap);
  addCardForm.reset();
  closePopup(addCardModal);
}

/* ******************************************************************************* */
/*                                 Event Listeners                                 */
/* ******************************************************************************* */

// Form listners
profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

modalEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

//add new card button
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

imgPreviewCloseButton.addEventListener("click", () => {
  closePopup(imgPreviewModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
