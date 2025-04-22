import 'pages/order/order-step/order-step'
import './user-data/user-data'
import './delivery/delivery'
import './payment/payment'
import { createYMap } from 'features/maps/createYMap'
import { isDesktop, isMobile } from 'globals/adaptive'

const testProducts = [
    'assets/content/products/card-1.jpg',
    'assets/content/products/card-2.jpg',
    'assets/content/products/card-3.jpg',
    'assets/content/products/card-4.jpg',
    'assets/content/products/card-2.jpg',
    'assets/content/products/card-3.jpg',
]

function createOrderMap() {
    const orderPage = document.querySelector<HTMLElement>('.order')
    if (!orderPage) return null

    const pointsPopup = document.querySelector('.points-popup')
    if (!pointsPopup) return null

    const mapElement = document.createElement('div')
    mapElement.classList.add('delivery__map')
    mapElement.setAttribute('data-key', '3b0f34a6-e20f-45e6-8b4f-fa2120d7244d')
    orderPage.append(mapElement)
    return createYMap(mapElement, { setPlacemark: false, ui: false })
}

function setOrderProducts(productImagePaths: string[]) {
    const maxImagesInView = isDesktop ? 3 : 2
    if (productImagePaths.length <= maxImagesInView) return

    const productImagesContainer = document.querySelector('.order-info__product-list')
    if (!productImagesContainer) return

    const restImages = productImagePaths.splice(maxImagesInView)

    const restImageElement = document.createElement('div')
    restImageElement.classList.add('order-info__product-rest')
    restImageElement.textContent = `+${restImages.length}`

    productImagePaths.forEach((image) => {
        const element = document.createElement('img')
        element.classList.add('order-info__product-image')
        element.src = image
        productImagesContainer.append(element)
    })
    productImagesContainer.append(restImageElement)
}

function moveSubmitButton() {
    const form = document.querySelector('.order form')
    const submitButton = form?.querySelector('button[type="submit"]')

    if (!submitButton) return
    submitButton.setAttribute('disabled', 'true')

    form?.insertAdjacentElement('beforeend', submitButton)
}

void (async function () {
    const firstStep = document.querySelector('.order-step:nth-child(3)')
    firstStep?.classList.add('_opened')
    window.map = createOrderMap()
    setOrderProducts(testProducts)

    if (isMobile) {
        moveSubmitButton()

        const lastInputs = document.querySelectorAll('.order-step:last-child input[type="radio"]')
        const submitButton = document.querySelector<HTMLButtonElement>('.order form button[type="submit"]')
        lastInputs.forEach((input) => {
            input.addEventListener('change', () => {
                if (submitButton?.disabled) {
                    submitButton?.removeAttribute('disabled')
                }
            })
        })
    }
})()
