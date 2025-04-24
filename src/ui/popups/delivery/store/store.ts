import { DeliveryPopup } from 'components/delivery/delivery'
import { closeActivePopup, PopupOpenedCustomEvent } from 'features/popup/popup'
import { setFinalData, validateStep } from 'components/order-step/order-step'

export interface Store {
    id: string
    image: string
    address: string
    info: string[]
    tel: string
    coords: [number, number]
}

interface StorePoint extends HTMLElement {
    dataset: {
        coords: string
    }
}

void (function () {
    const storePopup = document.querySelector<DeliveryPopup>('.store-popup')
    const storePopupInner = storePopup?.querySelector('.store-popup__inner')

    const mapContainer = storePopup?.querySelector<HTMLElement>('.popup__inner')
    if (!storePopup || !mapContainer) return

    const storePoints = storePopup.querySelectorAll<StorePoint>('.store-popup__point')
    storePoints[0].classList.add('_active')

    const storePopupCloseContent = document.querySelector('.store-popup__hide-content')
    storePopupCloseContent?.addEventListener('click', () => {
        storePopupInner?.classList.remove('_visible')
    })

    storePopup.addEventListener('opened', (e) => {
        const popupInner = document.querySelector('.store-popup__inner')
        const callPopupElement = (e as PopupOpenedCustomEvent).detail.trigger
        initStoreMap(storePopup, storePoints)
        const saveStoreButton = document.querySelector<HTMLButtonElement>('.store-popup__point-button')

        saveStoreButton?.addEventListener('click', () => {
            const activePoint = document.querySelector<HTMLElement>('.store-popup__point._active')
            if (!activePoint) return

            setFinalData({
                address: activePoint.querySelector('[data-point="address"]')?.textContent || '',
                method: storePopup.dataset.method,
            })

            if (callPopupElement) validateStep(callPopupElement)
            popupInner?.classList.remove('_visible')
            closeActivePopup()
        })
    })
})()

async function initStoreMap(mapContainer: HTMLElement, points: NodeListOf<StorePoint>) {
    const map = await window.map
    const mapElement = document.querySelector<HTMLElement>('.delivery__map')
    if (!map || !mapElement) return

    map.geoObjects.removeAll()
    mapContainer.append(mapElement)

    points.forEach((point) => {
        const coords = point.dataset.coords.split(',').map((coord) => Number(coord))

        const placemark = new ymaps.Placemark(
            coords,
            {},
            {
                iconLayout: 'default#image',
                iconImageSize: [54, 54],
                iconImageHref: './assets/icons/store-placemark.svg',
            },
        )

        placemark.events.add('click', () => {
            const popupInner = document.querySelector('.store-popup__inner')
            const currentActiveStore = document.querySelector('.store-popup__point._active')
            currentActiveStore?.classList.remove('_active')
            point.classList.add('_active')
            popupInner?.classList.add('_visible')
        })

        map.geoObjects.add(placemark)
    })

    const bounds = map.geoObjects.getBounds()
    if (!bounds) return
    setTimeout(() => map.setBounds(bounds, { checkZoomRange: true, zoomMargin: [30] }), 500)
}
