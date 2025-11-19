import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

interface SwiperSlideElement extends HTMLElement {
    dataset: {
        swiperSlideIndex: string
    }
}

const DEFAULT_DELAY = '5'

function createSVGCircle(container: Element) {
    const innerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    innerSvg.setAttribute('viewBox', '0 0 85 85')
    innerSvg.classList.add('inner')

    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    innerCircle.setAttribute('cx', '50%')
    innerCircle.setAttribute('cy', '50%')
    innerCircle.setAttribute('r', '50%')
    innerSvg.append(innerCircle)

    const outerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    outerSvg.setAttribute('viewBox', '0 0 85 85')
    outerSvg.classList.add('outer')

    const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    outerCircle.setAttribute('cx', '50%')
    outerCircle.setAttribute('cy', '50%')
    outerCircle.setAttribute('r', '50%')
    outerSvg.append(outerCircle)

    container.append(innerSvg)
    container.append(outerSvg)
}

void (function () {
    const mainHeroSlider = document.querySelector<HTMLElement>('.main-hero__slider')
    if (!mainHeroSlider) return

    const circlesPreview = document.querySelectorAll<HTMLElement>('.main-hero__thumbs-slide')

    const mainSwiper = new Swiper(mainHeroSlider, {
        modules: [Autoplay, EffectFade, Navigation, Pagination],
        effect: 'fade',
        slidesPerView: 1,
        loop: true,

        allowTouchMove: false,
        pagination: {
            el: '.main-hero__slider-pagination',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.main-hero__slider-navigation-prev',
            nextEl: '.main-hero__slider-navigation-next',
        },
        on: {
            init: (swiper) => {
                const circlesCount = circlesPreview.length
                const translate = circlesCount <= 5 ? 50 : 70

                /** Позиционирует круглые превью;
                 *  Создает SVG вокруг них;
                 *  Записывает количество секунд анимации круга в css переменную
                 */
                circlesPreview.forEach((item, index) => {
                    if (index === 0) {
                        item.classList.add('_active')
                    }

                    createSVGCircle(item)

                    item.style.translate = `-${translate * index}%`
                    item.style.zIndex = `-${index}`

                    const delay = swiper.slides[index].dataset.delay || DEFAULT_DELAY
                    item.style.setProperty('--delay', `${parseInt(delay) * 2}s`)
                })

                // @ts-ignore
                swiper.params.autoplay.delay = parseInt(swiper.slides[0].dataset.delay || DEFAULT_DELAY) * 1000
                swiper.autoplay.start()
            },
        },
    })

    function activateCirclePreview() {
        const activeSlide = document.querySelector('.swiper-slide-active') as SwiperSlideElement
        const activeIndex = parseInt(activeSlide.dataset.swiperSlideIndex)

        const activeCircle = circlesPreview[activeIndex]
        const currentActiveCircle = document.querySelector('.main-hero__thumbs-slide._active') as HTMLElement

        currentActiveCircle.classList.remove('_active')
        activeCircle.classList.add('_active')
        activeCircle.style.zIndex = `${activeIndex}`
        currentActiveCircle.style.zIndex = `${-activeIndex}`
    }

    function setDelayFromSlide(swiper: Swiper) {
        const currentSlide = document.querySelector<HTMLElement>('.swiper-slide-active')

        const delay = currentSlide?.dataset.delay || DEFAULT_DELAY

        swiper.autoplay.stop()
        // @ts-ignore
        swiper.params.autoplay.delay = parseInt(delay) * 1000
        swiper.autoplay.start()
    }

    mainSwiper.on('slideChangeTransitionStart', (swiper) => {
        console.log(swiper.activeIndex)
        activateCirclePreview()
        setDelayFromSlide(swiper)
    })
})()
