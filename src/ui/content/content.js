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

    const contentSwiperButtons = document.querySelectorAll(
        '.content .swiper-initialized .swiper-button-next, .content .swiper-button-prev',
    )

    contentSwiperButtons.forEach((button) => {
        button.innerHTML = `<svg width="45" height="24" viewBox="0 0 45 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 11.9944H44.5997C40.6353 12.3908 32.7064 10.6861 32.7064 0.695801M44.5997 12.0461C40.6353 11.6497 32.7064 13.3544 32.7064 23.3447"
                      stroke="white"
                      stroke-width="1.02762"></path>
            </svg>`
    })

    const videos = document.querySelectorAll('.content video')
    videos.forEach((video) => {
        const videoContainer = document.createElement('div')
        videoContainer.classList.add('video-container')
        video.insertAdjacentElement('afterend', videoContainer)
        videoContainer.append(video)

        videoContainer.insertAdjacentHTML(
            'beforeend',
            `<svg width="66" height="48" viewBox="0 0 66 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="65" height="47" rx="23.5" stroke="white"></rect>
                            <path d="M42 24L28.5 31.7942L28.5 16.2058L42 24Z" fill="white"></path>
                        </svg>`,
        )
    })
})()

document.querySelectorAll('dl').forEach((list) => {
    list.querySelectorAll('dt').forEach((title) => {
        title.addEventListener('click', () => {
            title.classList.toggle('active')
        })
    })
})
