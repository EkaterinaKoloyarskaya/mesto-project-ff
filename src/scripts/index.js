import "../pages/index.css";
import { initialCards } from "./cards.js";
import { removeCard } from "./card.js";
import { openModal } from "../scripts/modal.js";
import { closeModal } from "../scripts/modal.js";
import { createCard } from "./card.js";
import { closeModalOverlayListener } from "./modal.js";
import { enableValidation } from "./validation.js";
import { clearValidation } from "./validation.js";
import { loadUserInformation } from "./api.js";
import { loadCardsUsers } from "./api.js";
import { thenResponse } from "./api.js";
import { editProfileUser } from "./api.js";
import { addNewCard } from "./api.js";
import { deleteCardLike, addCardLike } from "./api.js";
import { editAvatarUser } from "./api.js";

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
const avatarImage = document.querySelector(".profile__image");
const closePopupNewAvatar = document.querySelector(
  ".popup_type_new-avatar .popup__close"
);
const saveButtonAvatar = document.querySelector(
  ".popup_type_new-avatar .popup__button"
);
const saveButtonCard = document.querySelector(
  ".popup_type_new-card .popup__button"
);
const saveButtonEditProfile = document.querySelector(
  ".popup_type_edit .popup__button"
);

// получаем содержимое template
export const cardTemplate = document.querySelector("#card-template").content;

// ищем в документе блок с классом places__list
export const cardContainer = document.querySelector(".places__list");

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
  clearValidation(profileEditButton, validationConfig);
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

// клик по крестику закрытия у аватара
closePopupNewAvatar.addEventListener("click", () => {
  closeModal(popupNewAvatar);
});

function renderLoading(isLoading, buttonElement, defaultText = "Сохранить") {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = defaultText;
  }
}

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

  renderLoading(true, saveButtonEditProfile);

  // Получите значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  const newDataUser = {
    name: nameInputValue,
    about: jobInputValue,
  };

  editProfileUser(newDataUser)
    .then((updatedUserData) => {
      profileTitle.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;

      // закрыть форму поле обновления
      closeModal(editProfileForm);
      // Очистить форму
      formElementEdit.reset();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      renderLoading(false, saveButtonEditProfile); // Возвращаем кнопку в исходное состояние
    });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener("submit", handleFormSubmitEditProfile);

// // Работа с формой "Обновить аватар"
// Находим форму в DOM
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const avatarElementEdit = popupNewAvatar.querySelector(".popup__form");

// Нахожу поля формы в DOM
const avatarLinkInput = avatarElementEdit.querySelector(
  ".popup__input_type_url"
);
const profileImage = document.querySelector(".profile__image");

avatarElementEdit.addEventListener(
  "submit",
  function handleFormSubmitEditAvatar(evt) {
    evt.preventDefault();

    renderLoading(true, saveButtonAvatar);

    const newAvatarUser = {
      avatar: avatarLinkInput.value,
    };

    editAvatarUser(newAvatarUser)
      .then((data) => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closeModal(popupNewAvatar);
        avatarElementEdit.reset();
      })
      .catch((err) => {
        console.error("Ошибка при обновлении аватара:", err);
      })
      .finally(() => {
        renderLoading(false, saveButtonAvatar);
      });
  }
);

profileImage.addEventListener("click", () => {
  openModal(popupNewAvatar);
  clearValidation(popupNewAvatar, validationConfig); // если используешь валидацию
});

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

  renderLoading(true, saveButtonCard);

  const newDataCard = {
    name: placeInput.value,
    link: linkImageInput.value,
  };

  addNewCard(newDataCard)
    .then((cardDataFromServer) => {
      const newCardElement = createCard(
        cardDataFromServer,
        removeCard,
        imageModalClick,
        cardTemplate,
        userId
      );

      cardContainer.prepend(newCardElement);

      // Закрываю модальное окно и Очищаю форму
      closeModal(popupTypeNewCard);
      formElementCard.reset();
      clearValidation(popupTypeNewCard, validationConfig);
    })
    .catch((err) => {
      console.log("Ошибка при загрузке данных:", err);
    })
    .finally(() => {
      renderLoading(false, saveButtonCard);
    });
}

// Прикрепляю обработчик к форме: // он будет следить за событием “submit” - «отправка»
formElementCard.addEventListener("submit", handleFormSubmitPlace);

// вызовы закрытия
allPopups.forEach((popup) => {
  popup.addEventListener("click", closeModalOverlayListener);
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// вызываю функцию
enableValidation(validationConfig);

let userId;
// Создаю массив с промисами
Promise.all([loadUserInformation(), loadCardsUsers()])

  .then(([userData, cardsData]) => {
    userId = userData._id;

    cardsData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        removeCard,
        imageModalClick,
        cardTemplate,
        userId
      );
      cardContainer.append(cardElement);
    });
  })
  // Если запрос не ушел на сервер или тот не ответил
  .catch((err) => {
    console.log("Ошибка при загрузке данных:", err);
  });
