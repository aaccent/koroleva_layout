import { isDesktop, isMobile } from 'globals/adaptive'

interface StartWithElement extends HTMLElement {
    dataset: {
        block: string
    }
}

function moveLine(activeElement: HTMLElement) {
    const line = document.querySelector<HTMLElement>('.brands__tab-list-line')
    const lineContainer = document.querySelector<HTMLElement>('.brands__tab-list')
    if (!line || !lineContainer) return

    const width = activeElement.offsetWidth
    const start = activeElement.getBoundingClientRect().left - lineContainer.getBoundingClientRect().left

    line.setAttribute('style', `width:${width}px; left:${start}px`)
}

function stickyElementsDesktop() {
    const observeTarget = document.querySelector('.brands__tab-list')
    if (!observeTarget) return

    const startWithBlock = document.querySelector('.brands__starts-with-list')
    const search = document.querySelector('.brands__search')

    const observer = new IntersectionObserver(([entries]) => {
        if (!entries.isIntersecting) {
            startWithBlock?.classList.add('_sticky')
            search?.classList.add('_sticky')
        } else {
            startWithBlock?.classList.remove('_sticky')
            search?.classList.remove('_sticky')
        }
    })

    observer.observe(observeTarget)
}

function mobileLayoutChanges() {
    changeTextOnMobile()
    const search = document.querySelector('.brands__search')
    const section = document.querySelector('.brands')
    const startWithList = document.querySelector('.brands__starts-with-list')
    const body = document.querySelector('.brands__body')
    if (!search || !startWithList) return
    section?.append(search)
    body?.append(startWithList)
}

function changeTextOnMobile() {
    const brandItem = document.querySelector('.brands__tab-item:first-child')
    if (brandItem) brandItem.textContent = 'Бренды'
}

void (function () {
    const startWith = document.querySelectorAll<StartWithElement>('.brands__starts-with-list span')
    startWith.forEach((start) => {
        start.addEventListener('click', () => {
            const block = Array.from(document.querySelectorAll('.brands__block-title')).find(
                (element) => element.textContent === start.dataset.block,
            )
            if (!block) return

            block.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
    })

    const tabs = document.querySelectorAll<HTMLElement>('.tab-item')
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelector('.tab-item._active')?.classList.remove('_active')
            tab.classList.add('_active')
            moveLine(tab)
        })
    })

    if (isDesktop) stickyElementsDesktop()

    if (isMobile) mobileLayoutChanges()
})()
