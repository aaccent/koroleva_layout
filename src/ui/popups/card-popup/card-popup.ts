import { PopupOpenedCustomEvent } from 'features/popup/popup'

void (function () {
    const cardPopup = document.querySelector<HTMLElement>('.card-popup')
    cardPopup?.addEventListener('opened', (e) => {
        const trigger = (e as PopupOpenedCustomEvent).detail
    })
    if (!cardPopup) return
    const popupValues = cardPopup.querySelectorAll<HTMLElement>('.card-popup__values-item')
    const values = document.querySelectorAll<HTMLElement>('.gift-card__list-item')

    values.forEach((value, index) => {
        popupValues[index].textContent = value.textContent
    })
})()
