import { openPopup } from 'features/popup/popup'
void (function () {
    const callDeliveryPopupButtons = document.querySelectorAll('.delivery__item[data-popup]')
    callDeliveryPopupButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const popupName = button.dataset.popup
            openPopup(popupName, button)
            const popup = document.querySelector(`.${popupName}-popup`)
            popup.dataset.method = button.querySelector('.delivery__item-title')?.textContent || ''
        })
    })
})()
//# sourceMappingURL=delivery.js.map
