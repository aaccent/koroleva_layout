import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

void (function () {
    const sliders = document.querySelectorAll<HTMLElement>('.slider__swiper')

    sliders.forEach((slider) => {
        const salesSlider = !!slider.closest('.sales')
        new Swiper(slider, {
            modules: [Navigation],
            slidesPerView: 1.2,
            spaceBetween: 16,
            navigation: {
                prevEl: '.slider__navigation-prev',
                nextEl: '.slider__navigation-next',
            },

            breakpoints: {
                1000: {
                    slidesPerView: salesSlider ? 2 : 3,
                    spaceBetween: 24,
                },
            },
        })
    })
})()
