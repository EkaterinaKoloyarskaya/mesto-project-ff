// в файле validation.js описаны функции для валидации форм.
//  Из файла экспортируется только функция активации валидации enableValidation
//  и функция очистки ошибок валидации clearValidation;

// Главная фунция, найдет на странице и обработает все формы, передаю в нее объект настроек классов  селекторов
export const enableValidation = (settings) => {
  // // Нахожу все формы с классом и делаю из них массив методом Array.from
  const forms = Array.from(document.querySelectorAll(settings.formSelector));

  // методом forEach перебираю формы и вызываю на них функцию setEventListeners, кот отслеживает ввод каждого символа в input
  forms.forEach((form) => {
    setEventListeners(form, settings);
  });
};

// Проверяет есть ли среди полей хотя бы одно невалидное (для работы с кнопкой отправки)
const hasInvalidInput = (inputList) => {
  // Прохожусь по массиву методом some
  return inputList.some((inputList) => {
    //  Если поле не валидно, то колюэк вернет true, обход массива прекратится
    // и вся функция hideInputError вернет true
    return !inputList.validity.valid;
  });
};

// Включает или выключает кнопку отправки формы в зависимости от валидности всех полей.
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    // Иначе сделай активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// 	Показывает ошибку (подсказка и красная рамка)
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  // Ищем поле ввода для ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // рамка меняет цвет
  inputElement.classList.add(settings.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(settings.errorClass);
};

// 	Скрывает ошибку
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);
  // Очищаем ошибку
  errorElement.textContent = "";
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(settings.errorClass);
};

// Проверяет одно поле на валидность и вызывает showInputError или hideInputError
const isValid = (formElement, inputElement, settings) => {
  // Проверяю введен ли текст, соответствующий pattern
  if (inputElement.validity.patternMismatch) {
    // Если pattern === true, не соттветствует, задаю свое сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // Если pattern === false, все введено верно, то очищаю сообщение об ошибке
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, то покажем ошибку; showInputError получает форму, в кот
    // находится проверяемое поле, и само поле; Третьим аргументом передаем сообщение об ошибке
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    // Если поле проходит валидацию, то скроем ошибку; hideInputError олучает форму, в кот
    // находится проверяемое поле, и само поле
    hideInputError(formElement, inputElement, settings);
  }
};

// 	Вешает слушатели на инпуты внутри конкретной формы
const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы и сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  // Обойдем все элементы методом forEach
  inputList.forEach((inputElement) => {
    // Каждому полю добавим обработчик события
    inputElement.addEventListener("input", () => {
      // Внутри коллбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

// При повторном открытии формы убирает все ошибки и деактивирует кнопку
export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement, settings) => {
    hideInputError(formElement, inputElement, settings);

    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  });
};
