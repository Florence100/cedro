const burgerCloseBtn = document.querySelector('.burger-btn_close');
const burgerOpenBtn = document.querySelector('.burger-btn_open');
const burgerMenu = document.querySelector('.burger-menu');

burgerCloseBtn.addEventListener('click', closeBtnClickHandler);
burgerOpenBtn.addEventListener('click', openBtnClickHandler);

function closeBtnClickHandler() {
    burgerMenu.classList.add('burger-menu_closed');
}

function openBtnClickHandler() {
    burgerMenu.classList.remove('burger-menu_closed');
}

