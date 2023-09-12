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
  open(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = data.link;
    this._previewImageTitle.textContent = data.name;
    super.open();
  }
}
