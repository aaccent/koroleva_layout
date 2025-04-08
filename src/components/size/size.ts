import Swiper from 'swiper'

void (function () {
    const sizeSlider = document.querySelector<HTMLElement>('.size__list .swiper')

    if (!sizeSlider) return

    new Swiper(sizeSlider, {
        slidesPerView: 5,
        spaceBetween: 14,
    })
})()
