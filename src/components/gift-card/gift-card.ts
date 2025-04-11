import { openPopup } from 'features/popup/popup'

void (function () {
    /** TODO: довести до ума бесконечню строку*/
    const scrollContainer = document.querySelector<HTMLElement>('.gift-card__scroll')
    const container = document.querySelector<HTMLElement>('.gift-card .container')
    const initialScrollContent = document.querySelector<HTMLElement>('.gift-card__scroll-content')
    if (!container || !scrollContainer || !initialScrollContent) return

    const containerWidth = container.offsetWidth
    const containerEnd = container.getBoundingClientRect().right
    const scrollContentWidth = initialScrollContent.clientWidth
    const margin = containerWidth - scrollContentWidth

    const addTitle = (translate: number) => {
        const scrollContent = document.createElement('div')
        scrollContent.classList.add('gift-card__scroll-content')

        const title = document.createElement('div')
        title.textContent = 'Подарочная карта'
        title.classList.add('gift-card__title')

        const icon = document.createElement('div')
        icon.classList.add('icon', 'icon--arrow-right')

        scrollContent.append(title, icon)
        scrollContainer.append(scrollContent)
        const titleMarginRight = parseInt(window.getComputedStyle(title).marginRight)
        const _translate = translate > scrollContentWidth ? scrollContentWidth * -1 : translate + titleMarginRight
        scrollContent.style.translate = `${_translate}px`
    }

    const checkWidth = () => {
        const titles = document.querySelectorAll<HTMLElement>('.gift-card__scroll-content')
        let titlesWidth = 0
        titles.forEach((title) => (titlesWidth += title.offsetWidth))
        const space = containerWidth - titlesWidth

        if (space > 0 || space > scrollContentWidth * -1) {
            addTitle(titlesWidth)
            checkWidth()
        } else {
            titles.forEach((title) => {
                let translate = parseInt(title.style.translate) || 0
                const titleMarginRight = parseInt(window.getComputedStyle(title).marginRight)

                let timeOut = setTimeout(function move() {
                    const titleStart = title.getBoundingClientRect().left
                    const width = title.offsetWidth
                    if (titleStart > containerEnd) {
                        scrollContainer.append(title)
                        translate = -width - margin
                        title.style.translate = `${translate}px`
                    } else {
                        translate += 200
                    }

                    title.style.translate = `${translate}px`
                    timeOut = setTimeout(move, 1000)
                }, 1000)
            })
        }
    }

    /** Выбор номинала карты */
    const cardValues = document.querySelectorAll('.gift-card__list-item')
    cardValues.forEach((value) => {
        value.addEventListener('click', () => {
            const currentValue = document.querySelector('.gift-card__list-item._active')
            currentValue?.classList.remove('_active')
            value.classList.add('_active')
        })
    })

    const openGiftCardPopup = document.querySelector<HTMLButtonElement>('.gift-card__button')
    openGiftCardPopup?.addEventListener('click', () => {
        const activeValue = document.querySelector<HTMLElement>('.gift-card__list-item._active')

        if (!activeValue) return

        openPopup('card', activeValue)
    })
})()
