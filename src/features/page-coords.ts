export function getCoords(element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    return { x: rect.left + window.scrollX, y: rect.top + window.scrollY }
}
