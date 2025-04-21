interface AnimateScrollConfig {
    element: HTMLElement
    startValue: string
    endValue: string
    startPos: number
    endPos: number
    property: 'top' | 'left' | 'right' | 'bottom'
}

export function insetOnScroll(config: AnimateScrollConfig) {
    config.element.style[config.property] = config.startValue
    const computedStyleValue = parseInt(getComputedStyle(config.element).getPropertyValue(config.property))

    return
    window.addEventListener(
        'scroll',
        () => {
            const scrollTrigger = window.scrollY + window.innerHeight - 24

            let newValue = `${scrollTrigger - config.startPos + computedStyleValue}px`
            if (scrollTrigger > config.endPos) newValue = config.endValue
            if (scrollTrigger < config.startPos) newValue = config.startValue
            console.log({
                config,
                scroll: window.scrollY,
                scrollTrigger,
                newValue,
                computedStyleValue,
            })
            config.element.style[config.property] = newValue
        },
        { passive: true },
    )
}
