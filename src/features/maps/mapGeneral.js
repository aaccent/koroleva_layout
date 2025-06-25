export const defaultConfig = {
    setPlacemark: true,
    zoomByWheel: false,
    ui: true,
    zoom: 17,
}
export function getMapContainer(container) {
    let mapEl = container instanceof HTMLElement ? container : document.querySelector(container)
    if (!mapEl) throw new Error(`Cannot find ${container} for map init`)
    if (!mapEl.dataset.key) throw new Error(`Map should have [data-key] attribute`)
    return mapEl
}
export function parseCoords(str) {
    const coordsRegex = /^(-?(?:[1-9]|[1-8][0-9]|90)(?:\.\d+)?(?:,| |, ))-?(?:[1-9]|1?[0-7][0-9]|180)(?:\.\d+)?$/
    if (!coordsRegex.test(str.trim())) throw new Error(`Coords not valid`)
    return str
        .trim()
        .replace(/[, ]/, '|')
        .split('|')
        .map((i) => parseFloat(i))
}
export function getMapCenter(mapContainer) {
    return !mapContainer.dataset.coords ? [49.106414, 55.796127] : parseCoords(mapContainer.dataset.coords)
}
//# sourceMappingURL=mapGeneral.js.map
