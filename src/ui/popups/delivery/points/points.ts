import { testPoints as points } from '@/testPoints'
import { isDesktop } from 'globals/adaptive'
import { closeActivePopup, PopupOpenedCustomEvent } from 'features/popup/popup'
import { setFinalData, validateStep } from 'pages/order/order-step/order-step'
import { DeliveryPopup } from 'pages/order/delivery/delivery'

export interface Point {
    id: number | string
    address: string
    price: string
    date: string
    coords: [number, number]
    image?: string
    workHours: string
}

interface InitPointMapProps {
    mapContainer: HTMLElement
    points: Point[]
    onSetPointButtonClick?: (e: MouseEvent) => void
}

function camelCaseToKebab(camelCaseString: string) {
    return camelCaseString.replaceAll(/[A-Z]/g, (substring) => `-${substring.toLowerCase()}`)
}

void (function () {
    const pointsPopup = document.querySelector<DeliveryPopup>('.points-popup')
    const mapContainer = pointsPopup?.querySelector<HTMLElement>('.popup__inner')
    if (!pointsPopup || !mapContainer) return

    let callPopupElement: HTMLElement | null = null

    const onSetPointButtonClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const method = pointsPopup.dataset.method
        const pointElement = target.closest('[data-point-id]')
        if (!pointElement) return

        const pointInfo = {
            address: pointElement.querySelector('[data-point="address"]')?.textContent || '',
            info: pointElement.querySelector('[data-point="date"]')?.textContent || '',
            method,
        }

        setFinalData(pointInfo)
        if (callPopupElement) validateStep(callPopupElement)
        closeActivePopup()
    }

    pointsPopup.addEventListener('opened', async (customEvent) => {
        callPopupElement = (customEvent as PopupOpenedCustomEvent).detail.trigger
        await initPointsMap({ mapContainer, points, onSetPointButtonClick })
    })

    const showListButton = pointsPopup.querySelector('.points-popup__show-list')
    showListButton?.addEventListener('click', () => {
        const list = pointsPopup.querySelector('.points-popup__content')
        list?.classList.add('_visible')
    })

    const closeListButton = pointsPopup.querySelector('.points-popup__content-close')
    closeListButton?.addEventListener('click', () => {
        const list = pointsPopup.querySelector('.points-popup__content')
        list?.classList.remove('_visible')
    })
})()

async function initPointsMap(options: InitPointMapProps) {
    const map = await window.map
    if (!map) return

    const { mapContainer, points, onSetPointButtonClick } = options

    map.geoObjects.removeAll()
    const mapElement = document.querySelector<HTMLElement>('.delivery__map')
    if (!mapElement) return
    mapContainer.append(mapElement)

    points.forEach((point) => {
        const hiddenClass = point.image ? '' : '_hidden'
        const baloonContent = `
    <div class="points-popup__baloon" data-point-id="${point.id}">
        <img class='points-popup__baloon-image ${hiddenClass}' src="${point.image}">
        <div class="points-popup__item-info--address" data-point='address'>${point.address}</div>
        <div class="points-popup__item-info--price">${point.price}</div>
        <div class="points-popup__item-info--date" data-point='date'>${point.date}</div>
        <div class="points-popup__item-info--work-hours">${point.workHours}</div>
        <button class="points-popup__baloon-button button" type="button">выбрать пункт</button>
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
    setTimeout(() => map.setBounds(bounds, { checkZoomRange: true, zoomMargin: [10] }), 500)

    map.balloon.events.add('open', () => {
        const setPointButton = document.querySelector<HTMLElement>('.points-popup__baloon-button')

        if (!setPointButton || !onSetPointButtonClick) return
        setPointButton.addEventListener('click', onSetPointButtonClick)
    })

    setPointList({ points, onSetPointButtonClick })
}

function setPointList(props: Omit<InitPointMapProps, 'mapContainer'>) {
    const { points, onSetPointButtonClick } = props
    const pointListElement = document.querySelector<HTMLElement>('.points-popup__list')
    if (!pointListElement) return
    pointListElement.classList.remove('_empty')
    pointListElement.innerHTML = ''

    if (!points.length) {
        pointListElement.classList.add('_empty')
        return
    }

    const layout = document.querySelector<HTMLElement>('.points-popup__item._layout')
    if (!layout) {
        console.log('Вероятно, кто-то удалил HTML разметку из верстки')
        return
    }

    points.forEach((point) => {
        const pointElement = layout.cloneNode(true) as HTMLElement
        pointElement.classList.remove('_layout')
        pointElement.setAttribute('data-point-id', point.id.toString())

        Object.entries(point).forEach(([key, value]) => {
            const dataPointElement = pointElement.querySelector(`[data-point=${camelCaseToKebab(key)}]`)
            if (!dataPointElement) return
            dataPointElement.textContent = value
        })

        pointListElement.append(pointElement)

        const setPointButton = pointElement.querySelector<HTMLElement>('.points-popup__item__button')

        if (!setPointButton || !onSetPointButtonClick) return
        setPointButton.addEventListener('click', onSetPointButtonClick)
    })
}
