const defaultOptions = {
    subtree: true,
    childList: true,
    attributes: false,
    characterData: false,
}
export function createMutationObserver(elements, callback, options = {}) {
    options = Object.assign(defaultOptions, options)
    const observer = new MutationObserver((mutations) => mutations.forEach(callback))
    if (elements instanceof Element) observer.observe(elements, options)
    else elements.forEach((el) => observer.observe(el, options))
}
//# sourceMappingURL=mutationObserver.js.map
