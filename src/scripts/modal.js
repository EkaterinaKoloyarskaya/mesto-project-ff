

// функция открытия модального окна 
  export const openModal = (editProfileForm) => { 
    editProfileForm.classList.add('popup_is-animated');
    editProfileForm.classList.add('popup_is-opened');
    // добавляем обработчик события
        document.addEventListener('keydown', closeEsc);
};



// функция закрытия модального окна, нажатием на крестик 
export const closeModal = (editProfileForm) => {
    editProfileForm.classList.remove('popup_is-opened');

    // удаляем обработчик события
    document.removeEventListener('keydown', closeEsc)
    };



// функция-обработчик события нажатия Esc
export const closeEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openPopap = document.querySelector('.popup_is-opened');
        closeModal(openPopap);
    }
};

// // функция-обработчик события клика по оверлею;
export const closeModalOverlayListener = (popups) => {
    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModal(popup);
        }
    });
    });
}

