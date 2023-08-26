export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  //opens popup
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", this.closeModalOnRemoteClick);
  }
  //close popup
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", this.closeModalOnRemoteClick);
  }

  _handleEscClose = (evt) => {
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.close();
    }
  };

  closeModalOnRemoteClick = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupCloseButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this._popupCloseButton.addEventListener("click", () => this.close());
  }
}
