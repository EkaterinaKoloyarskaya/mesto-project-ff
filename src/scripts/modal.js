
import { addCard } from './cards.js';
import { imageModalClick } from './index.js';
import { cardTemplate } from './index.js';
import { cardContainer } from './index.js';
import { removeCard } from './index.js';
import { cardLikeButton } from './cards.js';

// создаю переменные, которые будут находить класс кнопки редактирования
    const editModalButton = document.querySelector('.profile__edit-button');
    const windowModal = document.querySelector('.popup');
    const plusModalButton = document.querySelector('.popup_type_new-card');
    const addPlusModalButton = document.querySelector('.profile__add-button');
    const closeModalCross = document.querySelector('.popup_type_edit .popup__close');
    const closePlusModalCross = document.querySelector('.popup_type_new-card .popup__close');
    const windowModalImage = document.querySelector(".popup_type_image");
    const closeModalImage = document.querySelector('.popup_type_image .popup__close');
    const closeOverlay = document.querySelectorAll('.popup');
   
// функция открытия модального окна 
  export const openModal = (windowModal) => {
    windowModal.classList.add('popup_is-animated');
    windowModal.classList.add('popup_is-opened');
   
    
    // обработчик события, который будет закрывать попап при нажатии на esc
    const closeEsc = (evt) => {
        if (evt.key === 'Escape') {
            closeModal(windowModal, closeEsc);
        }
    };

    // добавляем обработчик события
        document.addEventListener('keydown', closeEsc);
};
   

// клик по кнопке редактирвоания
  editModalButton.addEventListener('click', () => {
    openModal(windowModal);
});

// клик по плюсику
addPlusModalButton.addEventListener('click', () => {
    openModal(plusModalButton);
});


// функция закрытия модального окна, нажатием на крестик 
  export const closeModal = (windowModal, closeEsc) => {
    windowModal.classList.remove('popup_is-opened');

    // удаляем обработчик события
    document.removeEventListener('keydown', closeEsc)
    };
  

// клик по крестику закрытия у модал окна на кнопку редактирования
  closeModalCross.addEventListener('click', () => {
    closeModal(windowModal);
});

// клик по крестику закрытия у модал окна +
closePlusModalCross.addEventListener('click', () => {
    closeModal(plusModalButton);
});


// клик по крестику закрытия у модал окна картинок
closeModalImage.addEventListener('click', () => {
    closeModal(windowModalImage);
});

// закрытие всех модальных окон по оверлею
closeOverlay.forEach((modalOverlayClose) => {
    modalOverlayClose.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
            closeModal(modalOverlayClose);
         }
    });
});

// // Работа с формой "Редактировать профиль"
// Находим форму в DOM
const editProfileForm = document.querySelector('.popup_type_edit');
const formElement = editProfileForm.querySelector('.popup__form')

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 





// Работа с формой "Новое место"
// Нахожу форму в DOM
const addCardModal = document.querySelector('.popup_type_new-card');
const formElementCard = addCardModal.querySelector('.popup__form');

// Нахожу поля формы в DOM
const placeInput = formElementCard.querySelector('.popup__input_type_card-name');
const linkImageInput = formElementCard.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы, хотя пока // она никуда отправляться не будет
export function handleFormSubmitPlace(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
     // Так мы можем определить свою логику отправки.  // О том, как это делать, расскажем позже.

    // Получаю значение полей placeInput и linkImageInput из свойства value
    const placeInputValue = placeInput.value;
    const linkImageInputValue = linkImageInput.value;

    const cardData = {
        name: placeInput.value,
        link: linkImageInput.value
    };


    // Создаю карточку и добавляю ее в контейнер
    const createCard = addCard(cardData, removeCard, imageModalClick, cardTemplate);
    cardContainer.prepend(createCard);
   

    // Закрываю модальное окно и Очищаю форму
    closeModal(plusModalButton);
    formElementCard.reset();
}
// Прикрепляю обработчик к форме: // он будет следить за событием “submit” - «отправка»
formElementCard.addEventListener('submit', handleFormSubmitPlace); 
