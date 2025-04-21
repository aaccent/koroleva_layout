import Swiper from 'swiper'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import { isMobile } from 'globals/adaptive'

export function createContentSwiper() {
    const imageGroup = document.querySelectorAll('.content div:has(img+img)')
    imageGroup.forEach((group) => {
        group.querySelectorAll('img').forEach((img) => img.classList.add('swiper-slide'))

        let options = {
            createElements: true,
            slidesPerView: 1,
        }

        if (isMobile) {
            options = Object.assign(options, {
                effect: 'slide',
                spaceBetween: 12,
            })
        } else {
            options = Object.assign(options, {
                modules: [EffectFade, Navigation],
                effect: 'fade',
                fadeEffect: { crossFade: true },
                navigation: {
                    enabled: true,
                },
            })
        }

        new Swiper(group, options)
    })
}

void (function () {
    if (!document.querySelector('.article')) return

    createContentSwiper()
})()

document.querySelectorAll('dl').forEach((list) => {
    list.querySelectorAll('dt').forEach((title) => {
        title.addEventListener('click', () => {
            list.querySelector('dt.active')?.classList.remove('active')
            title.classList.toggle('active')
        })
    })
})
