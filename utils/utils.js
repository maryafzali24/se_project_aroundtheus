export function openPopup(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keyup", isEscEvent);
}

export function closePopup(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keyup", isEscEvent);
}

//close the popup when the Esc button is pressed
export function isEscEvent(evt) {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      const openedPopup = modal.classList.contains("modal__opened");
      if (openedPopup) {
        closePopup(modal);
      }
    });
  }
}

export function closeModal(evt) {
  if (evt.target.classList.contains("modal__opened")) {
    closePopup(evt.currentTarget);
  }
}
