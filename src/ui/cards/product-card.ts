import { openPopup } from 'features/popup/popup'

document.querySelectorAll('[data-action="cart"]').forEach((cartButton) => {
    cartButton.addEventListener('click', () => {
        openPopup('fast-cart')
    })
})

function getActiveImage(container: Element) {
    return (
        container.querySelector('.product-card__images-list-item.active') ||
        container.querySelector('.product-card__images-list-item:first-child')
    )
}

function getImage(container: Element, mod: 1 | -1) {
    const activeImage = getActiveImage(container)
    if (!activeImage) return null

    const targetImage = mod ? activeImage.nextElementSibling : activeImage.previousElementSibling

    if (!targetImage) {
        const selector = `.product-card__images-list-item${mod ? ':first-child' : ':last-child'}`
        return container.querySelector(selector)
    } else {
        return targetImage
    }
}

document.querySelectorAll('.product-card__slide-button').forEach((button) => {
    button.addEventListener('click', () => {
        const isPrev = button.classList.contains('product-card__slide-button--prev')
        const container = button.closest('.product-card__top')
        if (!container) return

        const activeImage = getActiveImage(container)
        const targetImage = getImage(container, isPrev ? -1 : 1)

        activeImage?.classList.remove('active')
        targetImage?.classList.add('active')
    })
})
