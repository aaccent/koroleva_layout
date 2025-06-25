import { isMobile } from 'globals/adaptive'
function init() {
    const cartButton = document.querySelector('.cart-popup__button')
    if (!cartButton) return
    cartButton.textContent = isMobile ? 'к оформлению' : 'Перейти к оформлению'
}
init()
//# sourceMappingURL=cart.js.map
