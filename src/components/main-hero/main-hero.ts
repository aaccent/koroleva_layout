import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

interface SwiperSlideElement extends HTMLElement {
    dataset: {
        swiperSlideIndex: string
    }
}

function createSVGCircle(container: Element) {
    const innerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    innerSvg.setAttribute('viewBox', '0 0 100 100')
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
    const thumbs = document.querySelectorAll<HTMLElement>('.main-hero__thumbs-slide')
    thumbs[0].classList.add('_active')

    const mainHeroSlider = document.querySelector<HTMLElement>('.main-hero__slider')
    if (!mainHeroSlider) return

    const mainSwiper = new Swiper(mainHeroSlider, {
        modules: [Navigation, Pagination, Autoplay, EffectFade],
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        allowTouchMove: false,
        pagination: {
            el: '.main-hero__slider-pagination',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.main-hero__slide-navigation-prev',
            nextEl: '.main-hero__slide-navigation-next',
        },
    })

    function activateThumb() {
        const activeSlide = document.querySelector('.swiper-slide-active') as SwiperSlideElement
        const activeIndex = parseInt(activeSlide.dataset.swiperSlideIndex)

        const activeThumb = thumbs[activeIndex]
        const currentActiveThumb = document.querySelector('.main-hero__thumbs-slide._active') as HTMLElement
        currentActiveThumb.classList.remove('_active')
        activeThumb.classList.add('_active')
        activeThumb.style.zIndex = `${activeIndex}`
        currentActiveThumb.style.zIndex = `${-activeIndex}`
    }

    mainSwiper.on('slideChangeTransitionStart', activateThumb)

    // расположить кружки с изображениями
    thumbs.forEach((item, index) => {
        const translate = index * 50
        item.style.translate = `-${translate}%`
        item.style.zIndex = `-${index}`
        createSVGCircle(item)
    })
})()
