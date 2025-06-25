import { isMobile } from 'globals/adaptive'
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
    const body = document.querySelector('.brands__body')
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
    const body = document.querySelector('.brands__body')
    if (!searchContainer || !startWithList || !body) return
    section?.append(searchContainer)
    body?.append(startWithList)
}
function changeTextOnMobile() {
    const brandItem = document.querySelector('.brands__tab-item:first-child')
    if (brandItem) brandItem.textContent = 'Бренды'
}
void (function () {
    const startWith = document.querySelectorAll('.brands__starts-with-list span')
    startWith.forEach((start) => {
        start.addEventListener('click', () => {
            const block = Array.from(document.querySelectorAll('.brands__block-title')).find(
                (element) => element.textContent === start.dataset.block,
            )
            if (!block) return
            block.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
    })
    const items = document.querySelectorAll('.brands__item')
    items.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('_favorite')
        })
    })
    if (isMobile) {
        changeMobileLayout()
        hideSearchBlock()
    } else {
        makeStickyBlock()
    }
})()
//# sourceMappingURL=brands.js.map
