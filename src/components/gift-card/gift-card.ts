import { openPopup } from 'features/popup/popup'

function addScrollContent(number: number = 1) {
    const titles = document.querySelectorAll<HTMLElement>('.gift-card__scroll-content')
    const scrollContainer = document.querySelector<HTMLElement>('.gift-card__scroll')
    if (!scrollContainer) return

    const titleWidth = titles[0].offsetWidth

    const fullTitlesWidth = titleWidth * titles.length

    if (scrollContainer.offsetWidth + titleWidth < fullTitlesWidth) {
        titles.forEach((title) => {
            let translateValue
            if (!title.style.translate) {
                translateValue = 0
            } else {
                translateValue = parseInt(title.style.translate)
            }

            title.style.translate = `${translateValue - 100}%`
        })
        return
    }

    const translate = 100 * titles.length

    const extraTitle = titles[0].cloneNode(true) as HTMLElement
    extraTitle.style.translate = `${translate}%`
    extraTitle.classList.add(`${number}`)

    scrollContainer.append(extraTitle)
    addScrollContent(number + 1)
}

void (function () {
    addScrollContent()

    const titles = document.querySelectorAll<HTMLElement>('.gift-card__scroll-content')
    const scrollContainer = document.querySelector<HTMLElement>('.gift-card__scroll')
    if (!scrollContainer) return

    const maxTranslate = Math.round((scrollContainer.offsetWidth * 100) / titles[0].offsetWidth)

    const extraTranslatePx = titles[0].offsetWidth * (titles.length - 1) - scrollContainer.offsetWidth
    const extraTranslatePercent = Math.round((100 * extraTranslatePx) / titles[0].offsetWidth)

    let timeout = setTimeout(function move() {
        titles.forEach((title) => {
            const translate = parseInt(title.style.translate) || 0

            if (translate >= maxTranslate) {
                title.style.translate = `-${100 + extraTranslatePercent - 10}%`
                scrollContainer.append(title)
            } else {
                title.style.translate = `${translate + 10}%`
            }
        })

        timeout = setTimeout(move, 1000)
    }, 1000)

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

        openPopup('card', activeValue)
        activeValue?.classList.remove('_active')
    })
})()
