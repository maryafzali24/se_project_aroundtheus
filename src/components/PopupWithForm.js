import Popup from "./Popup.js";

export default class PopupwithForm extends Popup {
  // The popup selector, and a callback function when PopupWithForm calls and the form’s submit event fires
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");

    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
  }
  // reset the form once the popup is closed
  close() {
    super.close();
    this._popupForm.reset();
  }
  //collects data from all the input fields and returns that data as an object.
  _getInputValues() {
    const inputValues = {};
    for (const input of this._inputList) {
      inputValues[input.name] = input.value;
    }

    return inputValues;
  }
  // add submit event listener to the form and click handler to the close icon
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
  // set user information to form
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
