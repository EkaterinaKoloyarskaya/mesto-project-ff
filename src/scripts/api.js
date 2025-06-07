// в файле api.js описаны функции для взаимодействия с сервером;

// правильно организован код взаимодействия с сервером:
// - ответ сервера всегда проверяется на корректность проверкой res.ok;
// - действия с DOM-элементами на странице производятся только после завершения запроса;
// - в конце цепочки обработки каждого промиса обращения к серверу есть обработка ошибок;
// - базовый адрес сервера и ключ авторизации вынесены отдельно и переиспользуются;
// - для вставки данных полученных с сервера на страницу не используется innerHTML.

export const thenResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Делаю запрос к серверу для загрузки данных о пользователе
export const loadUserInformation = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/users/me", {
    method: "GET",
    headers: {
      authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
    },
  }).then(thenResponse);
};

// Делаю запрос на загрузку карточек, которые добавили другие студенты
export const loadCardsUsers = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/cards", {
    method: "GET",
    headers: {
      authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
    },
  }).then(thenResponse);
};

// Запрос на редактирование профиля
export const editProfileUser = (newDataUser) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/users/me", {
    method: "PATCH",
    headers: {
      authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDataUser),
  }).then(thenResponse);
};

// Добавить новую карточку на севрер

export const addNewCard = (newDataCard) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/cards", {
    method: "POST",
    headers: {
      authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDataCard),
  }).then(thenResponse);
};

// Поставить лайк на карточку

export const addCardLike = (cardLike) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-38/cards/likes/${cardLike}`,
    {
      method: "PUT",
      headers: {
        authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
      },
    }
  ).then(thenResponse);
};

// Убрать лайк с карточки

export const deleteCardLike = (cardLikeDelete) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-38/cards/likes/${cardLikeDelete}`,
    {
      method: "DELETE",
      headers: {
        authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
      },
    }
  ).then(thenResponse);
};

// Запрос на редактирование аватара
export const editAvatarUser = (avatar) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avatar),
  }).then(thenResponse);
};
