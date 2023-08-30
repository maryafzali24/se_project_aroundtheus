import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }
  //Add an image to the popup and the corresponding image src, attribute along with a caption for the image.
  open(name, link) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewImageTitle.textContent = name;
    super.open();
  }
}
