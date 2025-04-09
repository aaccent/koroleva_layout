import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

void (function () {
    const sliders = document.querySelectorAll<HTMLElement>('.slider .swiper')

    sliders.forEach((slider) => {
        const articleSlider = !!slider.closest('.articles')
        const salesSlider = !!slider.closest('.sales')
        const slidesPerView = articleSlider ? 4 : salesSlider ? 2 : 3
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
                    slidesPerView,
                    spaceBetween: 24,
                },
            },
        })
    })
})()
