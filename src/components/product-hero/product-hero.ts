import { EffectFade, Pagination } from 'swiper/modules'
import createMqSwiper from 'features/createMqSwiper'
import { isMobile } from 'globals/adaptive'

function getElementCoords(element: Element) {
    let rect = element.getBoundingClientRect()

    return {
        top: rect.top + window.scrollY,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
    }
}

interface Config {
    element: HTMLElement
    relativeElement: HTMLElement
    styleWhileIntersect: () => void
    styleWhileNotIntersect: () => void
}

// Фиксированные элементы
export function fixedItem(props: Config) {
    const setStyles = (isIntersect?: boolean) => {
        props.element.removeAttribute('style')

        const _isIntersect =
            isIntersect !== undefined ? isIntersect : !props.element.classList.contains('not-intersect')

        if (_isIntersect) {
            props.styleWhileIntersect()
        } else {
            props.styleWhileNotIntersect()
        }
    }

    const firstImage = document.querySelector<HTMLElement>('.product-hero__images-item')

    if (!firstImage) return

    const rect = getElementCoords(firstImage)
    const observer = new IntersectionObserver(
        (entries) => {
            setStyles(entries[0].isIntersecting)

            props.element.classList.toggle('not-intersect', !entries[0].isIntersecting)
        },
        { rootMargin: `-100% 0px ${window.innerHeight - rect.bottom + 24}px 0px` },
    )

    setStyles()
    window.addEventListener('resize', () => {
        setStyles()
    })
    observer.observe(props.relativeElement)
}

void (function () {
    if (isMobile) return

    const imagesList = document.querySelector<HTMLElement>('.product-hero__images-wrapper')
    const firstImage = document.querySelector<HTMLElement>('.product-hero__images-item')
    const setButton = document.querySelector<HTMLElement>('.product-hero__set-button')
    const imagesThumb = document.querySelector<HTMLElement>('.product-hero__images-thumb')
    if (!setButton || !imagesList || !imagesThumb || !firstImage) return

    fixedItem({
        element: setButton,
        relativeElement: imagesList,
        styleWhileIntersect() {
            const rect = getElementCoords(firstImage)

            setButton.style.position = 'fixed'
            setButton.style.left = '50%'
            setButton.style.bottom = `${window.innerHeight - rect.bottom + 24}px`
        },
        styleWhileNotIntersect() {
            setButton.style.position = 'absolute'
            setButton.style.left = '50%'
            setButton.style.bottom = `${24}px`
        },
    })

    fixedItem({
        element: imagesThumb,
        relativeElement: imagesList,
        styleWhileIntersect() {
            const rect = getElementCoords(firstImage)

            imagesThumb.style.position = 'fixed'
            imagesThumb.style.translate = '-100% 0'
            imagesThumb.style.left = `${rect.right - 24}px`
            imagesThumb.style.bottom = `${window.innerHeight - rect.bottom + 24}px`
        },
        styleWhileNotIntersect() {
            imagesThumb.style.position = 'absolute'
            imagesThumb.style.right = '24px'
            imagesThumb.style.bottom = `${24}px`
        },
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
