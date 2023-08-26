import Popup from "./Popup.js";

class PopupwithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this.inputList.forEach((value, key) => (this._formValues[key] = value));
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this.handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
