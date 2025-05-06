import "../pages/index.css";
import { initialCards } from "./cards.js";
import { removeCard } from "./card.js";
import { openModal } from "../scripts/modal.js";
import { closeModal } from "../scripts/modal.js";
import { createCard } from "./card.js";
import { closeModalOverlayListener } from "./modal.js";

// создаю переменные, которые будут находить нужные классы
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const closePopupTypeEdit = document.querySelector(
  ".popup_type_edit .popup__close"
);
const closePopupTypeNewCard = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const popupTypeImage = document.querySelector(".popup_type_image");
const closePopupTypeImage = document.querySelector(
  ".popup_type_image .popup__close"
);
const allPopups = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// получаем содержимое template
export const cardTemplate = document.querySelector("#card-template").content;

// ищем в документе блок с классом places__list
export const cardContainer = document.querySelector(".places__list");

// создаёт карточки из списка initialCards и добавляет их в контейнер на странице.
initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    removeCard,
    imageModalClick,
    cardTemplate
  );
  cardContainer.append(cardElement);
});

// функция открытия модального окна на карточку
export function imageModalClick(link, name) {
  const editProfileForm = document.querySelector(".popup_type_image");
  const cardImage = editProfileForm.querySelector(".popup__image");
  const cardTitle = editProfileForm.querySelector(".popup__caption");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  openModal(editProfileForm);
}

// клик по кнопке редактирвоания
profileEditButton.addEventListener("click", () => {
  // Заполненные значения профиля
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileForm);
});

// клик по плюсику
profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

// клик по крестику закрытия у модал окна на кнопку редактирования
closePopupTypeEdit.addEventListener("click", () => {
  closeModal(editProfileForm);
});

// клик по крестику закрытия у модал окна +
closePopupTypeNewCard.addEventListener("click", () => {
  closeModal(popupTypeNewCard);
});

// клик по крестику закрытия у модал окна картинок
closePopupTypeImage.addEventListener("click", () => {
  closeModal(popupTypeImage);
});

// // Работа с формой "Редактировать профиль"
// Находим форму в DOM
const editProfileForm = document.querySelector(".popup_type_edit");
const formElementEdit = editProfileForm.querySelector(".popup__form");

// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(
  ".popup__input_type_description"
);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener("submit", handleFormSubmitEditProfile);

// Работа с формой "Новое место"
// Нахожу форму в DOM
const addCardModal = document.querySelector(".popup_type_new-card");
const formElementCard = addCardModal.querySelector(".popup__form");

// Нахожу поля формы в DOM
const placeInput = formElementCard.querySelector(
  ".popup__input_type_card-name"
);
const linkImageInput = formElementCard.querySelector(".popup__input_type_url");

// Обработчик «отправки» формы, хотя пока // она никуда отправляться не будет
export function handleFormSubmitPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.  // О том, как это делать, расскажем позже.

  // Получаю значение полей placeInput и linkImageInput из свойства value
  const placeInputValue = placeInput.value;
  const linkImageInputValue = linkImageInput.value;

  const cardData = {
    name: placeInput.value,
    link: linkImageInput.value,
  };

  // Создаю карточку и добавляю ее в контейнер
  const addCard = createCard(
    cardData,
    removeCard,
    imageModalClick,
    cardTemplate
  );
  cardContainer.prepend(addCard);

  // Закрываю модальное окно и Очищаю форму
  closeModal(popupTypeNewCard);
  formElementCard.reset();
}
// Прикрепляю обработчик к форме: // он будет следить за событием “submit” - «отправка»
formElementCard.addEventListener("submit", handleFormSubmitPlace);

// вызовы закрытия
allPopups.forEach((popup) => {
  popup.addEventListener("click", closeModalOverlayListener);
});
