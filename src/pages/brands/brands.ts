import { isMobile } from 'globals/adaptive'

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

function makeStickyBlock() {
    const observeTarget = document.querySelector('.brands__tab-list')
    if (!observeTarget) return

    const startWithBlock = document.querySelector('.brands__starts-with-list')

    const observer = new IntersectionObserver(([entries]) => {
        if (!entries.isIntersecting) {
            startWithBlock?.classList.add('_sticky')
        } else {
            startWithBlock?.classList.remove('_sticky')
        }
    })

    observer.observe(observeTarget)
}

function hideSearchBlock() {
    const search = document.querySelector('.brands__search')
    const body = document.querySelector<HTMLElement>('.brands__body')
    if (!body) return

    const height = window.innerHeight
    const observer = new IntersectionObserver(
        ([entries]) => {
            if (!entries.isIntersecting) {
                search?.classList.add('_hidden')
            } else {
                search?.classList.remove('_hidden')
            }
        },
        {
            rootMargin: `-${height}px 0px 0px`,
        },
    )
    observer.observe(body)
}

function changeMobileLayout() {
    changeTextOnMobile()
    const searchContainer = document.querySelector('.brands__search')
    const section = document.querySelector('.brands')
    const startWithList = document.querySelector('.brands__starts-with-list')
    const body = document.querySelector<HTMLElement>('.brands__body')

    if (!searchContainer || !startWithList || !body) return
    section?.append(searchContainer)
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

    const hearts = document.querySelectorAll('.brands__item .icon--heart')
    hearts.forEach((heart) => {
        heart.addEventListener('click', () => {
            heart.closest('.brands__item')?.classList.toggle('_favorite')
        })
    })

    if (isMobile) {
        changeMobileLayout()
        hideSearchBlock()
    } else {
        makeStickyBlock()
    }
})()
