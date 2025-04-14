import { openPopup } from 'features/popup/popup'

document.querySelectorAll('[data-action="cart"]').forEach((cartButton) => {
    cartButton.addEventListener('click', () => {
        openPopup('fast-cart')
    })
})
