import { deleteCardLike, addCardLike } from "./api.js";
import { deleteCardFromServer } from "./api.js";

export function createCard(
  cardData,
  removeCardCallback,
  imageModalClick,
  cardTemplate,
  userId
) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // ищем блоки с классами card__image, card__delete-button, card__title
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounterElement = cardElement.querySelector(".card__like-counter");

  // добавляем атрибуты тегам и присваиваем им значения из объека
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // удаляется вся карточка со всем ее содержимым после того, как нажали на кнопку удаления
  if (cardData.owner._id !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCardFromServer(cardData._id)
        .then(() => {
          // удалить карточку из DOM
          removeCardCallback(cardElement);
        })
        .catch((err) => {
          console.log("Ошибка при удалении карточки", err);
        });
    });
  }

  // Проверить поставил ли лайк текущий пользователь
  const isLikeUser = (likesArray) => {
    return likesArray.some((user) => user._id === userId);
  };

  // Устанавливаем активный лайк при создании карточки
  if (isLikeUser(cardData.likes)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  // Установка счётчика лайков
  likeCounterElement.textContent = cardData.likes.length;

  // клик по карточке, чтобы вызвать модально окно
  cardImage.addEventListener("click", () =>
    imageModalClick(cardData.link, cardData.name)
  );

  // Обработать лайка
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );

    const method = isLiked ? deleteCardLike : addCardLike;

    method(cardData._id)
      .then((updatedCardData) => {
        // Обновить состояния кнопки
        likeButton.classList.toggle("card__like-button_is-active");

        // обновить счетчик лайков
        if (likeCounterElement) {
          likeCounterElement.textContent = updatedCardData.likes.length;
        } else {
          likeButton.classList.remove("card__like-button_is-active");
        }
      })
      .catch((err) => {
        console.log("Ошибка при обновлении данных", err);
      });
  });
  return cardElement;
}

// Удалить карточку из DOM.
export function removeCard(cardElement) {
  cardElement.remove();
}
