const buttonClose = document.querySelector('.button_close');
const buttonBurger = document.querySelector('.button_burger');
const burgerMenu = document.querySelector('.burger-menu');
const links = burgerMenu.querySelectorAll('a');

buttonClose?.addEventListener('click', burgerMenuClose);
buttonBurger?.addEventListener('click', burgerMenuOpen);

links?.forEach((link) => {
    link.addEventListener('click', burgerMenuClose);
})

function burgerMenuClose() {
    burgerMenu?.classList.add('burger-menu_closed');
    document.body.style.overflow = '';
}

function burgerMenuOpen() {
    burgerMenu?.classList.remove('burger-menu_closed');
    document.body.style.overflow = 'hidden';
}

