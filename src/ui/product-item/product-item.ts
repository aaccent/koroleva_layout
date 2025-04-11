import { disableScroll } from 'features/scroll'

const productItemCartButtons = document.querySelectorAll('.product-item__cart')
productItemCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.add('_hidden')
    })
})

disableScroll()
