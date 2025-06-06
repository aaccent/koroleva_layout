import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

void (function () {
    const sizeSlider = document.querySelector<HTMLElement>('.size__list .swiper')

    if (!sizeSlider) return

    new Swiper(sizeSlider, {
        modules: [Navigation],
        slidesPerView: 'auto',
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

const link = document.querySelector<HTMLAnchorElement>('.size__link')

document.querySelectorAll<HTMLElement>('.size__item').forEach((item) => {
    item.addEventListener('click', (e) => {
        if (!link) return

        const target = e.currentTarget as HTMLElement
        if (target.classList.contains('active')) {
            target.classList.remove('active')
        } else {
            item.classList.add('active')
            link.href = item.dataset.link || ''
        }
    })
})
