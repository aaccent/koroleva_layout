import { openPopup } from 'features/popup/popup'

interface CallPopupElement extends HTMLElement {
    dataset: {
        popup: string
    }
}

export interface DeliveryPopup extends HTMLElement {
    dataset: {
        method: string
    }
}

void (function () {
    const callDeliveryPopupButtons = document.querySelectorAll<CallPopupElement>('.delivery__item[data-popup]')
    callDeliveryPopupButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const popupName = button.dataset.popup
            openPopup(popupName, button)

            const popup = document.querySelector(`.${popupName}-popup`) as DeliveryPopup
            popup.dataset.method = button.querySelector<HTMLElement>('.delivery__item-title')?.textContent || ''
        })
    })
})()
