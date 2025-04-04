import { isDesktop, isMobile } from 'globals/adaptive'
import { disableScroll, enableScroll, toggleScroll } from 'features/scroll'

interface CatalogItem extends HTMLElement {
    dataset: {
        name: string
    }
}

void (function () {
    const header = document.querySelector<HTMLElement>('.header')
    const openCatalogMenuItem = document.querySelector('.header-menu__item[data-id="catalog"]')
    const menuItemWithSubMenu = document.querySelectorAll('.header-menu__item:has(.header-menu__item-submenu)')

    if (isDesktop) {
        openCatalogMenuItem?.addEventListener('mouseenter', () => {
            header?.classList.add('_active')
            disableScroll()
        })

        openCatalogMenuItem?.addEventListener('click', () => {
            header?.classList.remove('_active')
            enableScroll()
        })

        menuItemWithSubMenu.forEach((item) => {
            item.addEventListener('mouseover', () => {
                header?.classList.remove('_active')
                enableScroll()
            })
        })
    }

    if (isMobile) {
        const burgerMenu = document.querySelector('.header__mobile-burger')
        const catalogBack = document.querySelector<HTMLElement>('.header-catalog__back')
        const catalogItems = document.querySelectorAll<CatalogItem>('.header-catalog__item')
        const subcategories = document.querySelectorAll('.header-catalog__item-subcategory')

        burgerMenu?.addEventListener('click', () => {
            header?.classList.toggle('_opened')
            toggleScroll()
        })

        openCatalogMenuItem?.addEventListener(
            'click',
            () => {
                header?.classList.add('_active')
            },
            { capture: true },
        )

        catalogItems.forEach((item) => {
            item.addEventListener('click', () => {
                item.querySelector('.header-catalog__item-content')?.classList.add('_visible')
                if (!catalogBack) return
                catalogBack.textContent = item.dataset.name
            })
        })

        catalogBack?.addEventListener('click', () => {
            const visibleItemContent = document.querySelector('.header-catalog__item-content._visible')

            if (visibleItemContent) {
                visibleItemContent.classList.remove('_visible')
                catalogBack.textContent = 'Каталог'
            } else {
                header?.classList.remove('_active')
            }
        })

        subcategories.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.toggle('_opened')
            })
        })
    }
})()
