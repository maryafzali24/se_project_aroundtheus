// Enabling validation by calling enableValidation() function
// pass all the settings on call

/* --------- Elements-------------- */

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };
/*--------------- Functions------------------ */
// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// }

// const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// };

// const checkInputValidity = (formEl, inputEl, options) => {
//   if (!inputEl.validity.valid) {
//     showInputError(formEl, inputEl, options);
//   } else {
//     hideInputError(formEl, inputEl, options);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputEl) => {
//     return !inputEl.validity.valid;
//   });
// };

// const toggleButtonState = (inputList, submitButton, options) => {
//   const inactiveButtonClass = options.inactiveButtonClass;
//   if (hasInvalidInput(inputList)) {
//     submitButton.classList.add(inactiveButtonClass);
//     return (submitButton.disabled = true);
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     return (submitButton.disabled = false);
//   }
// };

// function setEventListeners(formEl, options) {
//   const { inputSelector } = options;
//   const inputList = Array.from(formEl.querySelectorAll(options.inputSelector));
//   const submitButton = formEl.querySelector(options.submitButtonSelector);
//   inputList.forEach((inputEl) => {
//     inputEl.addEventListener("input", () => {
//       checkInputValidity(formEl, inputEl, options);
//       toggleButtonState(inputList, submitButton, options);
//     });
//   });
// }

// function enableValidation(options) {
//   const formList = Array.from(document.querySelectorAll(options.formSelector));
//   console.log(formList);

//   formList.forEach((formEl) => {
//     formEl.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formEl, options);
//   });
// }

// enableValidation(config);
