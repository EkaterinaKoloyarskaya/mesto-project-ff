
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal } from '../scripts/modal.js';
import { closeModal } from '../scripts/modal.js';
import { addCard } from './cards.js';



// получаем содержимое template
export const cardTemplate = document.querySelector("#card-template").content;

// ищем в документе блок с классом places__list
export const cardContainer = document.querySelector(".places__list");

// функция  удаляет переданный элемент (cardElement) из DOM.
export function removeCard(cardElement) {
  cardElement.remove();
}

// создаёт карточки из списка initialCards и добавляет их в контейнер на странице.
initialCards.forEach((cardData) => {
  const cardElement = addCard(cardData, removeCard, imageModalClick, cardTemplate);
  cardContainer.append(cardElement);
});


// функция открытия модального окна на карточку
export function imageModalClick(link, name) {
  const windowModal = document.querySelector(".popup_type_image");
  const cardImage = windowModal.querySelector(".popup__image");
  const cardTitle = windowModal.querySelector(".popup__caption");
  
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  openModal(windowModal);
}









// В файле index.js должны остаться:
// - объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// - обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, 
//   открывающий попап при клике по изображению карточки);
// - вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать 
// объявленные здесь переменные и обработчики.


