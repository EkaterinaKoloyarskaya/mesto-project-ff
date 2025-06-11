export const thenResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const headers = {
  authorization: "1e9e54b5-7a6f-49d1-b3a2-3d8488c69c87",
  "Content-Type": "application/json",
};

// Сделать запрос к серверу для загрузки данных о пользователе
export const loadUserInformation = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/users/me", {
    method: "GET",
    headers: headers,
  }).then(thenResponse);
};

// Сделать запрос на загрузку карточек, которые добавили другие студенты
export const loadCardsUsers = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/cards", {
    method: "GET",
    headers: headers,
  }).then(thenResponse);
};

// Сделать запрос на редактирование профиля
export const editProfileUser = (newDataUser) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/users/me", {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(newDataUser),
  }).then(thenResponse);
};

// Добавить новую карточку на севрер
export const addNewCard = (newDataCard) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/cards", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newDataCard),
  }).then(thenResponse);
};

// Сделать запрос на редактирование аватара
export const editAvatarUser = (avatar) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-38/users/me/avatar", {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(avatar),
  }).then(thenResponse);
};

// Удалить карточку на сервере
export const deleteCardFromServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-38/cards/${cardId}`, {
    method: "DELETE",
    headers: headers,
  }).then(thenResponse);
};

// Поставить лайк на карточку
export const addCardLike = (cardLike) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-38/cards/likes/${cardLike}`,
    {
      method: "PUT",
      headers: headers,
    }
  ).then(thenResponse);
};

// Убрать лайк с карточки
export const deleteCardLike = (cardLikeDelete) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-38/cards/likes/${cardLikeDelete}`,
    {
      method: "DELETE",
      headers: headers,
    }
  ).then(thenResponse);
};
