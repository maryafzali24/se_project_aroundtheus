import {
  openPopup,
  // closePopup,
  // isEscEvent,
  // handleOverlay,
} from "../utils/utils.js";

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });

    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    const imgPreviewModal = document.querySelector("#preview-image-modal");
    openPopup(imgPreviewModal);
    imgPreviewModal.querySelector(".modal__image-preview").src = this._link;
    imgPreviewModal.alt = this._name;
    imgPreviewModal.querySelector(".modal__image-title").textContent =
      this._name;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._renderCard();
    this._setEventListeners();
    return this._cardElement;
  }

  _renderCard() {
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
  }
}
