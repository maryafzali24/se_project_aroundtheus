export function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", isEscEvent);
}

export function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", isEscEvent);
}

//close the popup when the Esc button is pressed
export function isEscEvent(evt) {
  evt.preventDefault();
  if (evt.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      const openedPopup = modal.classList.contains("modal_opened");
      if (openedPopup) {
        closePopup(modal);
      }
    });
  }
}

export function handleOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closePopup(evt.currentTarget);
  }
}
