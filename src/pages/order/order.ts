import 'pages/order/order-step/order-step'
import './user-data/user-data'
import './delivery/delivery'
import './payment/payment'
import { createYMap } from 'features/maps/createYMap'

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
    if (productImagePaths.length <= 3) return

    const productImagesContainer = document.querySelector('.order-info__product-list')
    if (!productImagesContainer) return

    const restImages = productImagePaths.splice(3)

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

void (async function () {
    const firstStep = document.querySelector('.order-step:nth-child(1)')
    firstStep?.classList.add('_opened')
    window.map = createOrderMap()
    setOrderProducts(testProducts)
})()
