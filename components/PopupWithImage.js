import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image-preview");
    this._imageTitle = this._popupElement.querySelector(".modal__image-title");
  }

  open(cardName, cardLink) {
    super.open();
    this._image.src = cardLink;
    this._image.alt = cardName;
    this._imageTitle.textContent = cardName;
  }
}
