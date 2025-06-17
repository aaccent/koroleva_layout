import { loadScript } from '@/features/loadScript'
import { getMapCenter, getMapContainer, MapConfig } from '@/features/maps/mapGeneral'
import { YMap, YMapProps } from '@yandex/ymaps3-types'
import * as turf from '@turf/turf'

export interface ElementWithCoords extends HTMLElement {
    dataset: {
        coords: string
    }
}

export async function loadYMap(apikey: string): Promise<void> {
    if (window.ymaps !== undefined) return

    const script = `https://api-maps.yandex.ru/v3/?apikey=${apikey}&lang=ru_RU`
    await loadScript(script, 'yaMap')

    await ymaps3.ready
}

export function setMapBounds(map: YMap, markersCoords: [number, number][]) {
    const bounds = turf.points(markersCoords)
    const center = turf.center(bounds)
    const result = center.geometry.coordinates as [number, number]

    map.setLocation({ center: result })
}

export function determineCoordinates(coords: number[]): [number, number] {
    if (coords.length !== 2) {
        throw new Error(`Массив ${coords} должен содержать ровно 2 числа`)
    }

    const [a, b] = coords

    // Проверяем, какое число может быть широтой, а какое - долготой
    const aIsLat = a >= -90 && a <= 90
    const bIsLat = b >= -90 && b <= 90
    const aIsLon = a >= -180 && a <= 180
    const bIsLon = b >= -180 && b <= 180

    if (aIsLat && bIsLon) {
        return [b, a] //{ latitude: a, longitude: b };
    } else if (bIsLat && aIsLon) {
        return [a, b]
    } else {
        // Если оба числа подходят под оба диапазона (например, 45 и 90)
        // или если числа выходят за допустимые диапазоны
        throw new Error(`Невозможно определить широту и долготу. Проверьте значения ${coords}.`)
    }
}

export function getCoordsFromDataset(elements: ElementWithCoords[]) {
    const rawCoords = elements.map((element) => element.dataset.coords.split(',').map((i) => Number(i)))
    return rawCoords.map((coords) => determineCoordinates(coords))
}

export async function createYMap(
    container: string | HTMLElement,
    props?: {
        zoom?: number
        theme?: YMapProps['theme']
        margin?: YMapProps['margin']
    },
) {
    let mapEl = getMapContainer(container)
    const mapCenter = getMapCenter(mapEl)

    await loadYMap(mapEl.dataset.key)

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3

    const map = new YMap(
        mapEl,
        {
            location: {
                center: mapCenter,
                zoom: props?.zoom || 15,
            },
            theme: props?.theme || 'light',
        },
        [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})],
    )

    // Необходимо для безопасной инициализации карты
    window.globalScripts.yaMap = 'created'

    return map
}
