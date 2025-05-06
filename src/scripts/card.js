export function createCard(
  cardData,
  removeCardCallback,
  imageModalClick,
  cardTemplate
) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // ищем блоки с классами card__image, card__delete-button, card__title
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  // добавляем атрибуты тегам и присваиваем им значения из объека
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // удаляется вся карточка со всем ее содержимым после того, как нажали на кнопку удаления
  cardDeleteButton.addEventListener("click", () =>
    removeCardCallback(cardElement)
  );

  // клик по карточке, чтобы вызвать модально окно
  cardImage.addEventListener("click", () =>
    imageModalClick(cardData.link, cardData.name)
  );

  // клик по кнопке сердца
  likeButton.addEventListener("click", () => {
    cardLikeButton(likeButton);
  });

  return cardElement;
}

// функция  удаляет переданный элемент (cardElement) из DOM.
export function removeCard(cardElement) {
  cardElement.remove();
}

// функция для лайка крточки(сердце активно)
export function cardLikeButton(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
