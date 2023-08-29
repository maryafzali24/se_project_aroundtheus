import Popup from "./Popup.js";

export default class PopupwithForm extends Popup {
  // The popup selector, and a callback function when PopupWithForm calls and the form’s submit event fires
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

  // _getInputValues() {
  //   this._formValues = {};
  //   this.inputList.forEach((value, key) => (this._formValues[key] = value));
  // }

  _getInputValues() {
    const inputValues = {};
    for (const input of this._inputList) {
      inputValues[input.name] = input.value;
    }

    return inputValues;
  }

  //   setEventListeners() {
  //     super.setEventListeners();
  //     this._popupForm.addEventListener("submit", () => {
  //       this.handleFormSubmit(this._getInputValues());
  //     });
  //   }
  // }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
