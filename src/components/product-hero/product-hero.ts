import { insetOnScroll } from 'features/scroll-based-animation'
import { EffectFade, Pagination } from 'swiper/modules'
import { isMobile } from 'globals/adaptive'
import createMqSwiper from 'features/createMqSwiper'

function getElementCoords(element: Element) {
    let rect = element.getBoundingClientRect()

    return {
        top: rect.top + window.scrollY,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
    }
}

// Fixed animation
void (function () {
    if (isMobile) return

    const setButton = document.querySelector<HTMLElement>('.product-hero__set-button')
    const thumb = document.querySelector<HTMLElement>('.product-hero__images-thumb')
    const images = document.querySelector<HTMLElement>('.product-hero__images-wrapper')
    const firstImage = document.querySelector<HTMLElement>('.product-hero__images-item:first-child')

    if (!setButton || !images || !firstImage || !thumb) return

    const startPos = getElementCoords(firstImage).bottom - 24
    const endPos = getElementCoords(images).bottom - 24

    const startValue = `${images.offsetHeight - firstImage.offsetHeight + 24}px`
    const endValue = `${24}px`

    insetOnScroll({
        element: setButton,
        property: 'bottom',
        endPos,
        startPos,
        endValue,
        startValue,
    })

    insetOnScroll({
        element: thumb,
        property: 'bottom',
        endPos,
        startPos,
        endValue,
        startValue,
    })
})()

createMqSwiper({
    mq: '(max-width: 1000px)',
    obj: {
        selector: '.product-hero .swiper',
        options: {
            enabled: true,
            createElements: true,
            effect: 'fade',
            pagination: {
                enabled: true,
            },
            modules: [Pagination, EffectFade],
            breakpoints: {
                1000: {
                    enabled: false,
                },
            },
        },
    },
})

// Фиксированная информация на мобилке
void (function () {
    const cartButton = document.querySelector('.product-hero__cart-button')
    const fixedInfo = document.querySelector('.product-hero__fixed-info')

    if (!cartButton || !fixedInfo) return

    const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting || entries[0].boundingClientRect.bottom > 0) {
            fixedInfo.classList.remove('active')
        } else {
            fixedInfo.classList.add('active')
        }
    })

    intersectionObserver.observe(cartButton)
})()
