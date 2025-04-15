import { openPopup } from 'features/popup/popup'

interface CallPopupElement extends HTMLElement {
    dataset: {
        popup: string
    }
}

void (function () {
    const callDeliveryPopupButtons = document.querySelectorAll<CallPopupElement>('.delivery__item[data-popup]')
    callDeliveryPopupButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const popupName = button.dataset.popup
            openPopup(popupName, button)
        })
    })
})()
