'use strict'
const productItemCartButtons = document.querySelectorAll('.product-item__cart')
productItemCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.add('_hidden')
    })
})
//# sourceMappingURL=product-item.js.map
