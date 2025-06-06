import { createYMap } from 'features/maps/createYMap'

export interface ShopElement extends HTMLElement {
    dataset: {
        coords: string
        id: string
    }
}

void (async function () {
    const shopPopup = document.querySelector<HTMLElement>('.shops-popup')
    if (!shopPopup) return

    const wideScreen = window.matchMedia('(min-width:2000px)').matches

    const shopsElements = shopPopup.querySelectorAll<ShopElement>('.shops__item')
    shopsElements[0].classList.add('_active')

    const mapContainer = document.createElement('div')
    mapContainer.classList.add('shops-popup__map')

    mapContainer.setAttribute('data-key', '3b0f34a6-e20f-45e6-8b4f-fa2120d7244d')
    const map = await createYMap(mapContainer, { setPlacemark: false, ui: false })

    shopPopup.append(mapContainer)

    shopsElements.forEach((shop) => {
        const coords = shop.dataset.coords.split(',').map((i) => Number(i))
        const placemark = new ymaps.Placemark(
            coords,
            {},
            {
                iconLayout: 'default#image',
                iconImageHref: 'assets/icons/store-placemark.svg',
                iconImageSize: wideScreen ? [80, 80] : [54, 54],
            },
        )
        placemark.events.add('click', () => {
            shopPopup.querySelector('.shops__item._active')?.classList.remove('_active')
            shop.classList.add('_active')
        })

        map.geoObjects.add(placemark)
    })

    const bounds = map.geoObjects.getBounds()
    if (!bounds) return
    const rightMargin = window.innerWidth / 2
    setTimeout(() => map.setBounds(bounds, { zoomMargin: [0, rightMargin, 0, 0] }), 500)
})()
