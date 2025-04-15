import { testPoints, testPoints2 } from '@/testPoints'
import { isDesktop } from 'globals/adaptive'
export interface Point {
    id: number | string
    address: string
    price: number
    date: string
    coords: [number, number]
}

void (async function () {
    const pointsPopup = document.querySelector<HTMLElement>('.points-popup')
    if (!pointsPopup) return

    pointsPopup.addEventListener('opened', (e) => {
        const target = e.target as HTMLElement
        initPointsMap(target, testPoints)
    })
})()

async function initPointsMap(container: HTMLElement, points: Point[]) {
    const map = await window.map
    if (!map) return

    map.geoObjects.removeAll()
    const mapElement = document.querySelector<HTMLElement>('.order__map')
    if (!mapElement) return
    container.append(mapElement)

    points.forEach((point) => {
        const baloonContent = `
    <div class="points-popup__baloon points-popup__item" data-point-id="${point.id}">
        <div class="points-popup__baloon-address points-popup__item-address ">${point.address}</div>
        <div class="points-popup__baloon-price points-popup__item-price">${point.price}</div>
        <div class="points-popup__baloon-date points-popup__item-date">${point.date}</div>
        <button class="points-popup__baloon-button button button--dark" type="button" data-action="points">выбрать пункт</button>
    </div>`

        const placemark = new ymaps.Placemark(
            point.coords,
            {
                balloonContent: baloonContent,
            },
            {
                iconLayout: 'default#image',
                iconImageSize: [54, 54],
                iconImageHref: './assets/icons/SDEK.svg',
                hideIconOnBalloonOpen: false,
                hasBalloon: isDesktop,
            },
        )

        // placemark.events.add('click', () => {
        //     Object.entries(point).forEach(([key, value]) => {
        //         const baloonMobile = document.querySelector<HTMLElement>('.points-popup__baloon--mobile')
        //         const baloonContent = document.querySelector(`[data-baloon-id='${key}']`)
        //         if (!baloonContent || !baloonMobile) return
        //
        //         baloonContent.textContent = value
        //         baloonMobile.classList.add('_visible')
        //         baloonMobile.dataset.pointId = point.id.toString()
        //     })
        // })

        map.geoObjects.add(placemark)
    })
    const bounds = map.geoObjects.getBounds()
    if (!bounds) return
    map.setBounds(bounds, { zoomMargin: [9], checkZoomRange: true })
}
