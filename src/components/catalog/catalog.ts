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

        document.querySelector('[data-action="view"].active')?.classList.remove('active')
        viewButton.classList.add('active')
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
