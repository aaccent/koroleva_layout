import 'pages/order/order-step/order-step'
import './user-data/user-data'
import './delivery/delivery'
import './payment/payment'
import { createYMap } from 'features/maps/createYMap'

function createOrderMap() {
    const orderPage = document.querySelector<HTMLElement>('.order')
    if (!orderPage) return null

    const pointsPopup = document.querySelector('.points-popup')
    if (!pointsPopup) return null

    const mapContainer = document.createElement('div')
    mapContainer.classList.add('order__map')
    mapContainer.setAttribute('data-key', '3b0f34a6-e20f-45e6-8b4f-fa2120d7244d')
    orderPage.append(mapContainer)
    return createYMap(mapContainer, { setPlacemark: true, ui: true })
}

void (function () {
    const firstStep = document.querySelector('.order-step:nth-child(2)')
    firstStep?.classList.add('_opened')
    window.map = createOrderMap()
})()
