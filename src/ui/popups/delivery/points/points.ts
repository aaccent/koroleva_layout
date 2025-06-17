import { closeActivePopup, PopupOpenedCustomEvent } from 'features/popup/popup'
import { setFinalData, validateStep } from 'components/order-step/order-step'
import { DeliveryPopup } from 'components/delivery/delivery'
import { determineCoordinates, setMapBounds } from 'features/maps/createYMap'
import { isMobile } from 'globals/adaptive'

export interface Point {
    id: string
    address: string
    price: string
    date: string
    coords: string
    image?: string
    hours: string
}

interface HTMLPointElement extends HTMLElement {
    dataset: HTMLElement['dataset'] & Point
}

interface InitPointMapProps {
    mapContainer: HTMLElement
    dataPoints: Point[]
    onSetPointButtonClick: (e: MouseEvent) => void
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

        const dataPoints: Point[] = Array.from(
            document.querySelectorAll<HTMLPointElement>('.points-popup__data-list div'),
        ).map((i) => i.dataset)

        initPointsMap({ mapContainer, dataPoints, onSetPointButtonClick })
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

function createMarkerBalloon(pointInfo: Point, onButtonClick: (e: MouseEvent) => void) {
    const hiddenClass = pointInfo.image ? '' : '_hidden'
    const balloon = document.createElement('div')
    balloon.classList.add('points-popup__balloon')
    balloon.dataset.pointId = pointInfo.id

    const closeBalloonButton = document.createElement('button')
    closeBalloonButton.classList.add('points-popup__balloon-close')
    closeBalloonButton.onclick = () => balloon.classList.remove('_visible')

    balloon.innerHTML = `<img class='points-popup__balloon-image ${hiddenClass}' src="${pointInfo.image}">
                               <div class="points-popup__item-info--address" data-point='address'>${pointInfo.address}</div>
                               <div class="points-popup__item-info--price">${pointInfo.price}</div>
                               <div class="points-popup__item-info--date" data-point='date'>${pointInfo.date}</div>
                               <div class="points-popup__item-info--work-hours">${pointInfo.hours}</div>
                               <button class="points-popup__balloon-button button" type="button">выбрать пункт</button>`

    balloon.append(closeBalloonButton)

    const setPointButton = balloon.querySelector<HTMLElement>('.points-popup__balloon-button')
    setPointButton?.addEventListener('click', onButtonClick)

    return balloon
}

function initPointsMap(options: InitPointMapProps) {
    const map = window.map
    if (!map) return

    const { mapContainer, dataPoints, onSetPointButtonClick } = options

    const mapElement = document.querySelector<HTMLElement>('.delivery__map')
    if (!mapElement) return
    mapContainer.append(mapElement)

    const { YMapDefaultSchemeLayer, YMapMarker } = ymaps3

    map.children.forEach((child) => {
        // @ts-ignore
        if (child.element) map.removeChild(child)
    })

    if (isMobile) {
        map.update({
            location: {
                zoom: 12,
            },
        })
    }

    dataPoints.forEach((point) => {
        const coords = determineCoordinates(point.coords.split(',').map((i) => Number(i)))

        const markerEl = document.createElement('div')
        markerEl.classList.add('points-popup__marker')

        markerEl.append(createMarkerBalloon(point, onSetPointButtonClick))

        markerEl.onclick = (e) => {
            e.stopPropagation()
            if (e.target !== e.currentTarget) {
                const activeBalloon = document.querySelector('.points-popup__balloon._opened')
                activeBalloon?.classList.remove('_opened')
            } else {
                const activeBalloon = document.querySelector('.points-popup__balloon._opened')
                activeBalloon?.classList.remove('_opened')
                const balloon = markerEl.querySelector('.points-popup__balloon')
                balloon?.classList.add('_opened')
            }
        }

        const marker = new YMapMarker({ coordinates: coords }, markerEl)
        map.addChild(new YMapDefaultSchemeLayer({}))
        map.addChild(marker)
    })

    const markersCoords = dataPoints.map((point) => determineCoordinates(point.coords.split(',').map((i) => Number(i))))

    setMapBounds(map, markersCoords)

    setPointList({ dataPoints, onSetPointButtonClick })
}

function setPointList(props: Omit<InitPointMapProps, 'mapContainer'>) {
    const { dataPoints, onSetPointButtonClick } = props
    const pointListElement = document.querySelector<HTMLElement>('.points-popup__list')
    if (!pointListElement) return
    pointListElement.classList.remove('_empty')
    pointListElement.innerHTML = ''

    if (!dataPoints.length) {
        pointListElement.classList.add('_empty')
        return
    }

    const layout = document.querySelector<HTMLElement>('.points-popup__item._layout')
    if (!layout) {
        console.log('Вероятно, кто-то удалил HTML разметку из верстки')
        return
    }

    dataPoints.forEach((point) => {
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

        setPointButton?.addEventListener('click', onSetPointButtonClick)
    })
}
