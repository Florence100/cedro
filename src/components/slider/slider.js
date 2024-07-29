const SLIDER_WIDTH = 256;
const SLIDER_MARGIN = 32;
const SLIDER_MOBILE_MARGIN = 8;
let windowWidth = document.documentElement.clientWidth;
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

if (windowWidth > 766) {
    getSliderCount(SLIDER_WIDTH, SLIDER_MARGIN);
    getSliderCenterPadding(sliderCount, SLIDER_MARGIN);
} else {
    getSliderCount(SLIDER_WIDTH, SLIDER_MOBILE_MARGIN);
    getSliderCenterPadding(sliderCount, SLIDER_MOBILE_MARGIN);
}

window.addEventListener('resize', () => {
    windowWidth = document.documentElement.clientWidth;

    if (windowWidth > 766) {
        getSliderCount(SLIDER_WIDTH, SLIDER_MARGIN);
        getSliderCenterPadding(sliderCount, SLIDER_MARGIN);
    } else {
        getSliderCount(SLIDER_WIDTH, SLIDER_MOBILE_MARGIN);
        getSliderCenterPadding(sliderCount, SLIDER_MOBILE_MARGIN);
    }
})

console.log(sliderCount);
console.log(sliderCenterPadding);


$('.slider').slick({
    autoplay: true,
    infinite: true,
    slidesToShow: sliderCount,
    slidesToScroll: 3,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    centerPadding: `${sliderCenterPadding}px`,
});


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