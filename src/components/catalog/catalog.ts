import Swiper from 'swiper'
import { FreeMode } from 'swiper/modules'

interface ViewPartElement extends HTMLElement {
    dataset: {
        view: string
    }
}

const catalogList = document.querySelector<ViewPartElement>('.catalog__products-list')

document.querySelectorAll<ViewPartElement>('[data-action="view"]').forEach((viewButton) => {
    viewButton.addEventListener('click', () => {
        if (!catalogList || !viewButton.dataset.view) return
        const allActiveSwitchers = document.querySelectorAll('[data-action="view"].active')
        const allSameSwitchers = document.querySelectorAll(
            `[data-action="view"][data-view="${viewButton.dataset.view}"]`,
        )

        allActiveSwitchers.forEach((i) => i.classList.remove('active'))
        allSameSwitchers.forEach((i) => i.classList.add('active'))
        catalogList.dataset.view = viewButton.dataset.view
    })
})

new Swiper('.catalog__subcategories-list-wrapper', {
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 8,
    centerInsufficientSlides: true,
    modules: [FreeMode],
    breakpoints: {
        1000: {
            spaceBetween: 16,
        },
    },
})

void (function () {
    const filter = document.querySelector('.filter')
    const showElements = document.querySelectorAll('[data-show-on-scroll]')

    if (!filter) return

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            showElements.forEach((i) => i.classList.remove('active'))
        } else {
            showElements.forEach((i) => i.classList.add('active'))
        }
    })

    observer.observe(filter)
})()

document.querySelectorAll('[data-action="scroll-top"]').forEach((button) => {
    button.addEventListener('click', () => {
        scrollTo(0, 0)
    })
})
