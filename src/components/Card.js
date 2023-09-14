export default class Card {
  constructor(
    { data, handleImageClick, handleDeleteCard, confirmPopup, api },
    cardTemplateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardTemplateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._confirmPopup = confirmPopup;
    this._api = api;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this, this._id);
    });
  }
  // delete the card and remove the link to the DOM element
  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  _setLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _handleLikeIcon = () => {
    if (!this._isLiked) {
      this._api
        .likeCard(this._id)
        .then(() => {
          this._likeButton.classList.add("card__like-button_active");
          this._isLiked = !this._isLiked;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this._api
        .unlikeCard(this._id)
        .then(() => {
          this._likeButton.classList.remove("card__like-button_active");
          this._isLiked = !this._isLiked;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    this._setLike();
    return this._cardElement;
  }
}
