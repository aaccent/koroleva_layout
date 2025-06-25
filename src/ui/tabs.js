'use strict'
void (function () {
    const tabsContainer =
        document.querySelector('.grid-section__links-list') || document.querySelector('.brands__tab-list')
    if (!tabsContainer) return
    const line = document.createElement('div')
    line.classList.add('line')
    tabsContainer.append(line)
    const tabs = document.querySelectorAll('.grid-section__links-list-item, .brands__tab-item')
    tabs.forEach((tab) => {
        if (tab.classList.contains('active')) {
            line.style.left = tab.getBoundingClientRect().left - tabsContainer.getBoundingClientRect().left + 'px'
            line.style.width = tab.offsetWidth + 'px'
        }
        tab.addEventListener('click', () => {
            const currentActive =
                document.querySelector('.grid-section__links-list-item.active') ||
                document.querySelector('.brands__tab-item.active')
            currentActive?.classList.remove('active')
            tab.classList.add('active')
            line.style.left = tab.getBoundingClientRect().left - tabsContainer.getBoundingClientRect().left + 'px'
            line.style.width = tab.offsetWidth + 'px'
        })
    })
})()
//# sourceMappingURL=tabs.js.map
