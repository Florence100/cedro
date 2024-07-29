const SLIDER_WIDTH = 256;
const SLIDER_MARGIN = 32;
const SLIDER_MOBILE_MARGIN = 8;
let windowWidth;
let sliderCount;
let sliderCenterPadding;


function getSliderCount(sliderWidth, sliderMargin) {
    sliderCount =  Math.trunc(windowWidth / (sliderWidth + sliderMargin));
    return sliderCount;
}


function getSliderCenterPadding(cliderCount, sliderMargin) {
    sliderCenterPadding = ( windowWidth - ( cliderCount * SLIDER_WIDTH + ( cliderCount ) * sliderMargin )) / 2;
    return sliderCenterPadding;
}


function sliderInit() {
    let init = $('.slider').data('init-slider');
    windowWidth = document.documentElement.clientWidth;

    if (windowWidth > 766) {
        getSliderCount(SLIDER_WIDTH, SLIDER_MARGIN);
        getSliderCenterPadding(sliderCount, SLIDER_MARGIN);
    } else {
        getSliderCount(SLIDER_WIDTH, SLIDER_MOBILE_MARGIN);
        getSliderCenterPadding(sliderCount, SLIDER_MOBILE_MARGIN);
    }

    if (!init) {
        $('.slider').slick({
            autoplay: true,
            infinite: true,
            slidesToShow: sliderCount,
            slidesToScroll: 3,
            arrows: false,
            centerMode: true,
            swipeToSlide: true,
            centerPadding: `${sliderCenterPadding}px`,
        }).data({'init-slider': true});
    } else {
        $('.slider').slick('unslick').data({'init-slider': false});
        $('.slider').slick({
            autoplay: true,
            infinite: true,
            slidesToShow: sliderCount,
            slidesToScroll: 3,
            arrows: false,
            centerMode: true,
            swipeToSlide: true,
            centerPadding: `${sliderCenterPadding}px`,
        }).data({'init-slider': true});
    }
}


sliderInit();
window.addEventListener('resize', sliderInit);
window.addEventListener('orientationchange', sliderInit);


function addToFavorites() {
    const favoriteProducts = new Set();
    let favoriteProductsCount = favoriteProducts.size;
    const cards = document.querySelectorAll('.card');
    const favoriteCount = document.querySelector('.header__favorite-count');
    
    favoriteCountUpdate(favoriteProductsCount);

    cards?.forEach((card) => {
        const faviriteIcon = card.querySelector('.card__favorite');
        
        faviriteIcon.addEventListener('click', () => {
            if (!favoriteProducts.has(card)) {
                favoriteProducts.add(card);
                favoriteProductsCount = favoriteProducts.size;
                faviriteIcon.classList.add('card__favorite_ative');
                favoriteCountUpdate(favoriteProductsCount);
            } else {
                favoriteProducts.delete(card);
                favoriteProductsCount = favoriteProducts.size;
                faviriteIcon.classList.remove('card__favorite_ative');
                favoriteCountUpdate(favoriteProductsCount);
            }
        })
    })
}


function favoriteCountUpdate(count) {
    const favoriteCount = document.querySelector('.header__favorite-count');

    if (count > 0) {
        favoriteCount.textContent = count
        favoriteCount.style.display = 'flex';
    } else {
        favoriteCount.style.display = 'none';
    }
}

addToFavorites();
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


