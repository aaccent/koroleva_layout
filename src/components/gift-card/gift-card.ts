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

    // const titles = document.querySelectorAll<HTMLElement>('.gift-card__scroll-content')
    // const scrollContainer = document.querySelector<HTMLElement>('.gift-card__scroll')
    // if (!scrollContainer) return
    //
    // console.log(scrollContainer.offsetWidth)
    // console.log(titles[0].offsetWidth)
    //
    // //Сколько % занимает длинна строки от длинны контейнера
    // const titlePercent = Math.round((titles[0].offsetWidth * 100) / scrollContainer.offsetWidth)
    // console.log('titlePercent ' + titlePercent)
    //
    // //Сколько % ширина контенера относительно ширины строки
    // const containerPercent = Math.round((scrollContainer.offsetWidth * 100) / titles[0].offsetWidth)
    //
    // console.log('containerPercent ' + containerPercent)
    //
    // //На сколько % сумма ширин строк больше ширины контейнера
    // const extraTranslate =
    //     containerPercent < 100
    //         ? 100 - containerPercent
    //         : ((titles[0].offsetWidth * (titles.length - 1) - scrollContainer.offsetWidth) * 100) /
    //           scrollContainer.offsetWidth
    // console.log('extraTranslate ' + extraTranslate)
    //
    // let timeout = setTimeout(function move() {
    //     titles.forEach((title) => {
    //         const translate = parseInt(title.style.translate) || 0
    //         if (translate > containerPercent) {
    //             console.log(containerPercent, translate)
    //             scrollContainer.append(title)
    //             title.style.translate = `-${100 + extraTranslate}%`
    //         } else {
    //             title.style.translate = `${translate + 1}%`
    //         }
    //     })
    //
    //     timeout = setTimeout(move, 100)
    // }, 100)

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
