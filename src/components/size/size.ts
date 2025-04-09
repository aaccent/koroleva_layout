import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

void (function () {
    const sizeSlider = document.querySelector<HTMLElement>('.size__list .swiper')

    if (!sizeSlider) return

    new Swiper(sizeSlider, {
        modules: [Navigation],
        slidesPerView: 4.5,
        spaceBetween: 10,
        navigation: {
            nextEl: '.size__list-navigation-next',
            prevEl: '.size__list-navigation-prev',
        },

        breakpoints: {
            1000: {
                slidesPerView: 5,
                spaceBetween: 14,
            },
        },
    })
})()
