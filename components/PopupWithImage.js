import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imagePreview = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._imagePreviewTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }

  open(cardName, cardLink) {
    this._imagePreview.src = cardLink;
    this._imagePreview.alt = cardName;
    this._imagePreviewTitle.textContent = cardName;
    super.open();
  }
}
