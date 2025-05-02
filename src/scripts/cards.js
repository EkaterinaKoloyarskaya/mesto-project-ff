

// массив объекта, который в свою очередь имеет по 2 свойства

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
// Функции для работы с карточками проекта Mesto вынесите в файл card.js, из него должна экспортироваться 
// функция initialCards. Функции, обрабатывающие события лайка и удаления карточки, 
// также должны находиться в этом файле и экспортироваться из него.

// функция для смены класса сердца в активное состояние
export function cardLikeButton(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
  };

export function addCard(cardData, removeCardCallback, imageModalClick, cardTemplate) {

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
  cardDeleteButton.addEventListener("click", () => removeCardCallback(cardElement));

  // клик по карточке, чтобы вызвать модально окно
  cardImage.addEventListener('click', () => imageModalClick(cardData.link, cardData.name));
  
  // клик по кнопке сердца
  likeButton.addEventListener('click', () => {
    cardLikeButton(likeButton);
  });
  
  return cardElement;
}




