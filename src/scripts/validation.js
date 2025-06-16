// Главная фунция, найдет на странице и обработает все формы, передаю в нее объект настроек классов  селекторов
export const enableValidation = (config) => {
  // // Нахожу все формы с классом и делаю из них массив методом Array.from
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  // методом forEach перебираю формы и вызываю на них функцию setEventListeners, кот отслеживает ввод каждого символа в input
  forms.forEach((form) => {
    setEventListeners(form, config);
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

const disableSubmitButton = (buttonElement, config) => {
  // Деактивация кнопки
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, config) => {
  // Активация кнопки
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
};

// Включает или выключает кнопку отправки формы в зависимости от валидности всех полей.
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
};

// 	Показывает ошибку (подсказка и красная рамка)
const showInputError = (formElement, inputElement, errorMessage, config) => {
  // Ищем поле ввода для ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // рамка меняет цвет
  inputElement.classList.add(config.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(config.errorClass);
};

// 	Скрывает ошибку
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  // Очищаем ошибку
  errorElement.textContent = "";
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
};

// Проверяет одно поле на валидность и вызывает showInputError или hideInputError
const isValid = (formElement, inputElement, config) => {
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
      config
    );
  } else {
    // Если поле проходит валидацию, то скроем ошибку; hideInputError олучает форму, в кот
    // находится проверяемое поле, и само поле
    hideInputError(formElement, inputElement, config);
  }
};

// 	Вешает слушатели на инпуты внутри конкретной формы
const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы и сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  // Обойдем все элементы методом forEach
  inputList.forEach((inputElement) => {
    // Каждому полю добавим обработчик события
    inputElement.addEventListener("input", () => {
      // Внутри коллбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// При повторном открытии формы убирает все ошибки и деактивирует кнопку
export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);

    disableSubmitButton(buttonElement, config);
  });
};
