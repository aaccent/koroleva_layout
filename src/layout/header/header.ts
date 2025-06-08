import { isDesktop, isMobile } from 'globals/adaptive'
import { enableScroll, toggleScroll } from 'features/scroll'

interface CatalogItem extends HTMLElement {
    dataset: {
        name: string
    }
}

/** Высота и позиционирование шапки и его меню */
void (function () {
    const header = document.querySelector<HTMLElement>('.header')

    /** Выставляет переменную в CSS с высотой шапки для позиционирования меню */
    function setHeaderHeight() {
        if (!header) return

        const height = `${header.offsetHeight}px`
        document.documentElement.style.setProperty('--header-height', height)
    }
    setHeaderHeight()

    window.addEventListener('resize', setHeaderHeight)
})()

/** Высота хлебных крошек */
void (function () {
    const breadcrumbs = document.querySelector<HTMLElement>('.breadcrumbs')

    /** Выставляет переменную в CSS с высотой шапки для позиционирования меню */
    function setBreadcrumbsHeight() {
        if (!breadcrumbs) return

        const styles = getComputedStyle(breadcrumbs)
        const marginTop = parseInt(styles.marginTop)
        const marginBottom = parseInt(styles.marginBottom)

        const height = breadcrumbs.offsetHeight + marginTop + marginBottom

        const value = `${height}px`
        document.documentElement.style.setProperty('--breadcrumbs-height', value)
    }
    setBreadcrumbsHeight()

    window.addEventListener('resize', setBreadcrumbsHeight)
})()

const header = document.querySelector<HTMLElement>('.header')

function setToggleHeader() {
    header?.classList.toggle('_scrolled', window.scrollY > 15)
}

void (function () {
    const openCatalogMenuItem = document.querySelector('.header-menu__item[data-id="catalog"]')
    const headerCatalog = document.querySelector('.header-catalog')
    const menuItemWithSubMenu = document.querySelectorAll('.header-menu__item:has(.header-menu__item-submenu)')
    const headerMenuItems = document.querySelectorAll('.header-menu__item')

    setToggleHeader()
    window.addEventListener('scroll', setToggleHeader)

    if (isDesktop) {
        openCatalogMenuItem?.addEventListener('mouseenter', () => {
            header?.classList.add('_active')
        })

        headerCatalog?.addEventListener('mouseleave', () => {
            header?.classList.remove('_active')
        })

        headerMenuItems.forEach((item) => {
            if (item === openCatalogMenuItem) return
            item.addEventListener('mouseover', () => {
                header?.classList.remove('_active')
            })
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
        const itemSubmenu = document.querySelectorAll('.header-menu__item:has(.header-menu__item-submenu)')
        const submenuBack = document.querySelectorAll<HTMLElement>('.header-menu__item-submenu-back')
        const catalogItems = document.querySelectorAll<CatalogItem>('.header-catalog__item')
        const subcategories = document.querySelectorAll('.header-catalog__item-subcategory')

        itemSubmenu.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.add('_active')
            })
        })

        submenuBack.forEach((back) => {
            back.addEventListener('click', (e) => {
                e.stopPropagation()
                const item = back.closest('.header-menu__item')
                item?.classList.remove('_active')
            })
        })

        burgerMenu?.addEventListener('click', () => {
            header?.classList.toggle('_opened')

            header?.classList.remove('_active')

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
