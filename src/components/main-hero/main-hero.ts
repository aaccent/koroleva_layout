import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

interface SwiperSlideElement extends HTMLElement {
    dataset: {
        swiperSlideIndex: string
    }
}

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

    const mainSwiper = new Swiper(mainHeroSlider, {
        modules: [Autoplay, EffectFade],
        effect: 'fade',
        slidesPerView: 1,
        loop: true,
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            1000: {
                modules: [Navigation, Pagination],
                allowTouchMove: false,
                pagination: {
                    el: '.main-hero__slider-pagination',
                    type: 'fraction',
                },
                navigation: {
                    prevEl: '.main-hero__slider-navigation-prev',
                    nextEl: '.main-hero__slider-navigation-next',
                },
            },
        },
    })

    const circlesPreview = document.querySelectorAll<HTMLElement>('.main-hero__thumbs-slide')
    circlesPreview[0].classList.add('_active')

    /** Позиционирует круглые превью и создает SVG вокруг них */
    circlesPreview.forEach((item, index) => {
        const translate = index * 50
        item.style.translate = `-${translate}%`
        item.style.zIndex = `-${index}`
        createSVGCircle(item)
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

    mainSwiper.on('slideChangeTransitionStart', activateCirclePreview)
})()
