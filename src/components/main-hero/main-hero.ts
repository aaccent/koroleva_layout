import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

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

    const firstSlideDelay = document.querySelectorAll<HTMLElement>('.main-hero__slide')[0].dataset.delay || '3'

    const mainSwiper = new Swiper(mainHeroSlider, {
        modules: [Autoplay, EffectFade, Navigation, Pagination],
        effect: 'fade',
        slidesPerView: 1,
        loop: true,
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: parseInt(firstSlideDelay) * 1000,
        },

        allowTouchMove: false,
        pagination: {
            el: '.main-hero__slider-pagination',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.main-hero__slider-navigation-prev',
            nextEl: '.main-hero__slider-navigation-next',
        },
    })

    const circlesPreview = document.querySelectorAll<HTMLElement>('.main-hero__thumbs-slide')
    const mainSlides = document.querySelectorAll<HTMLElement>('.main-hero__slide')

    const circlesCount = circlesPreview.length
    const translate = circlesCount <= 5 ? 50 : 70

    /** Позиционирует круглые превью и создает SVG вокруг них */
    circlesPreview.forEach((item, index) => {
        if (index === 0) {
            item.classList.add('_active')
        }

        item.style.translate = `-${translate * index}%`
        item.style.zIndex = `-${index}`

        const delay = mainSlides[index].dataset.delay || '3'
        item.style.setProperty('--delay', `${parseInt(delay) * 2}s`)
        createSVGCircle(item)
    })

    function activateCirclePreview(swiper: Swiper) {
        const activeIndex = swiper.activeIndex

        const activeCircle = circlesPreview[activeIndex]
        const currentActiveCircle = document.querySelector('.main-hero__thumbs-slide._active') as HTMLElement

        currentActiveCircle.classList.remove('_active')
        currentActiveCircle.style.zIndex = `${-activeIndex}`

        activeCircle.classList.add('_active')
        activeCircle.style.zIndex = `${activeIndex}`
    }

    function setDelayFromSlide(swiper: Swiper) {
        const currentSlide = swiper.slides[swiper.activeIndex]
        const delay = currentSlide.dataset.delay || '2'

        swiper.autoplay.stop()
        // @ts-ignore
        swiper.params.autoplay.delay = parseInt(delay) * 1000
        swiper.autoplay.start()
    }

    mainSwiper.on('slideChangeTransitionStart', activateCirclePreview)
    mainSwiper.on('slideChange', setDelayFromSlide)
})()
