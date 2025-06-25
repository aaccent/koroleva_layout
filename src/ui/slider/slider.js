import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
void (function () {
    const sliders = document.querySelectorAll('.slider__swiper')
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
void (function () {
    const articleSliderNavigation = document.querySelector('.articles .slider__navigation')
    if (!articleSliderNavigation) return
    articleSliderNavigation.classList.add('articles__more')
    articleSliderNavigation.innerHTML = `<a href='#' class="articles__more-link">смотреть все</a>`
})()
//# sourceMappingURL=slider.js.map
