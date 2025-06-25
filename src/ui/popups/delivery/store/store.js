import { closeActivePopup } from 'features/popup/popup'
import { setFinalData, validateStep } from 'components/order-step/order-step'
import { determineCoordinates, getCoordsFromDataset, setMapBounds } from 'features/maps/createYMap'
void (function () {
    const storePopup = document.querySelector('.store-popup')
    const storePopupInner = storePopup?.querySelector('.store-popup__inner')
    const mapContainer = storePopup?.querySelector('.popup__inner')
    if (!storePopup || !mapContainer) return
    const storePoints = storePopup.querySelectorAll('.store-popup__point')
    storePoints[0].classList.add('_active')
    const storePopupCloseContent = document.querySelector('.store-popup__hide-content')
    storePopupCloseContent?.addEventListener('click', () => {
        storePopupInner?.classList.remove('_visible')
    })
    storePopup.addEventListener('opened', (e) => {
        const popupInner = document.querySelector('.store-popup__inner')
        const callPopupElement = e.detail.trigger
        initStoreMap(storePopup, storePoints)
        const saveStoreButton = document.querySelector('.store-popup__point-button')
        saveStoreButton?.addEventListener('click', () => {
            const activePoint = document.querySelector('.store-popup__point._active')
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
async function initStoreMap(mapContainer, points) {
    const map = window.map
    const mapElement = document.querySelector('.delivery__map')
    if (!map || !mapElement) return
    /*map.geoObjects.removeAll()*/
    mapContainer.append(mapElement)
    const { YMapDefaultSchemeLayer, YMapMarker } = ymaps3
    map.children.forEach((child) => {
        // @ts-ignore
        if (child.element) map.removeChild(child)
    })
    points.forEach((point) => {
        const coords = determineCoordinates(point.dataset.coords.split(',').map((coord) => Number(coord)))
        const markerEl = document.createElement('div')
        markerEl.classList.add('store-popup__marker', 'shops-popup__marker')
        markerEl.addEventListener('click', () => {
            const activeMarker = document.querySelector('.store-popup__marker._active')
            activeMarker?.classList.remove('_active')
            markerEl.classList.add('_active')
            const popupInner = document.querySelector('.store-popup__inner')
            const currentActiveStore = document.querySelector('.store-popup__point._active')
            currentActiveStore?.classList.remove('_active')
            point.classList.add('_active')
            popupInner?.classList.add('_visible')
        })
        const marker = new YMapMarker({ coordinates: coords }, markerEl)
        map.addChild(new YMapDefaultSchemeLayer({}))
        map.addChild(marker)
    })
    const coords = getCoordsFromDataset(Array.from(points))
    setMapBounds(map, coords)
}
//# sourceMappingURL=store.js.map
