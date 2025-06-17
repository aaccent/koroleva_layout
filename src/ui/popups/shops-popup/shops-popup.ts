import { createYMap, ElementWithCoords, getCoordsFromDataset, setMapBounds } from 'features/maps/createYMap'
import { isMobile } from 'globals/adaptive'

export type ShopElement = ElementWithCoords & {
    dataset: {
        id: string
    }
}

void (async function () {
    const shopPopup = document.querySelector<HTMLElement>('.shops-popup')
    if (!shopPopup) return

    const shopsElements = Array.from(shopPopup.querySelectorAll<ShopElement>('.shops__item'))
    shopsElements[0].classList.add('_active')

    const mapContainer = document.createElement('div')
    mapContainer.classList.add('shops-popup__map')

    mapContainer.setAttribute('data-key', '3b0f34a6-e20f-45e6-8b4f-fa2120d7244d')
    shopPopup.append(mapContainer)

    const map = await createYMap(mapContainer, {
        theme: 'dark',
        margin: [0, 250, 0, 0],
        zoom: isMobile ? 12 : 14,
    })

    const { YMapMarker } = ymaps3

    const markersCoords = getCoordsFromDataset(shopsElements)

    markersCoords.forEach((coords) => {
        const markerElement = document.createElement('div')
        markerElement.classList.add('shops-popup__marker')

        const activeShopItemInfo = document.querySelector<ShopElement>('.shops__item._active')
        if (
            activeShopItemInfo?.dataset.coords.includes(coords[0].toString()) &&
            activeShopItemInfo?.dataset.coords.includes(coords[1].toString())
        ) {
            markerElement.classList.add('_active')
        }

        markerElement.addEventListener('click', () => {
            const activeMarker = document.querySelector(`.shops-popup__marker._active`)
            activeMarker?.classList.remove('_active')
            markerElement.classList.add('_active')
            const shopItemInfo = shopsElements.find((el) => {
                return (
                    el.dataset.coords.includes(coords[0].toString()) && el.dataset.coords.includes(coords[1].toString())
                )
            })

            const activeShopItemInfo = document.querySelector('.shops__item._active')
            activeShopItemInfo?.classList.remove('_active')
            shopItemInfo?.classList.add('_active')
        })

        const mapMarker = new YMapMarker(
            {
                coordinates: coords,
            },
            markerElement,
        )
        map.addChild(mapMarker)

        setMapBounds(map, markersCoords)
    })
})()
