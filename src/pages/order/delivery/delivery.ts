import { openPopup } from 'features/popup/popup'

interface CallPopupElement extends HTMLElement {
    dataset: {
        popup: string
    }
}

void (function () {
    const callCourierPopup = document.querySelector<CallPopupElement>('.delivery__item[data-popup="courier"]')
    callCourierPopup?.addEventListener('click', () => {
        const popupName = callCourierPopup.dataset.popup

        openPopup(popupName, callCourierPopup)
    })
})()
