
import '../pages/index.css';
import initialCards from './cards.js';

const cardTemplate = document.querySelector("#card-template").content;

const cardContainer = document.querySelector(".places__list");

function addCard(cardData, removeCardCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardDeleteButton.addEventListener("click", () => removeCardCallback(cardElement));
  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((cardData) => {
  const cardElement = addCard(cardData, removeCard);
  cardContainer.append(cardElement);
});

