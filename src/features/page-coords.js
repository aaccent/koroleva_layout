export function getCoords(element) {
    const rect = element.getBoundingClientRect()
    return { x: rect.left + window.scrollX, y: rect.top + window.scrollY }
}
//# sourceMappingURL=page-coords.js.map
