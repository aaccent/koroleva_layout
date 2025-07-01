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
            `<svg class="video-container__play-icon" width="66" height="48" viewBox="0 0 66 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="65" height="47" rx="23.5" stroke="white"></rect>
                            <path d="M42 24L28.5 31.7942L28.5 16.2058L42 24Z" fill="white"></path>
                        </svg>`,
        )

        const svg = videoContainer.querySelector('.video-container__play-icon')

        video.addEventListener('click', (e) => {
            e.preventDefault()
            const isVideoPlaying = !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
            if (!isVideoPlaying) {
                svg.classList.add('_hidden')
                video.play()
                setTimeout(() => video.setAttribute('controls', 'true'), 500)
            }
        })
    })

    const shareLinks = document.querySelectorAll('main .socials__item')
    const url = encodeURIComponent(window.location.href)

    shareLinks.forEach((link) => {
        let onCLick
        const id = link.id

        switch (id) {
            case 'tg':
                onCLick = () => {
                    const text = encodeURIComponent(document.title)
                    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank', 'width=550,height=400')
                }
                break
            case 'vk':
                onCLick = () => {
                    const title = encodeURIComponent(document.title)
                    window.open(`https://vk.com/share.php?url=${url}&title=${title}`, '_blank', 'width=550,height=400')
                }
                break
            case 'ok':
                onCLick = () => {
                    window.open(`https://connect.ok.ru/offer?url=${url}`, '_blank', 'width=550,height=400')
                }
                break
            case 'youtube':
                onCLick = () => window.open('https://www.youtube.com', '_blank')
                break
            default:
                onCLick = () => false
        }

        link.addEventListener('click', (e) => {
            e.preventDefault()
            onCLick()
        })
    })
})()

document.querySelectorAll('dl').forEach((list) => {
    list.querySelectorAll('dt').forEach((title) => {
        title.addEventListener('click', () => {
            title.classList.toggle('active')
        })
    })
})
