'use strict'
document.querySelectorAll('.tabs-block').forEach((tabsBlock) => {
    const list = tabsBlock.querySelector('.tabs-block__list')
    if (!list) return
    tabsBlock.querySelectorAll('.tabs-block__item').forEach((tab, index) => {
        const title = tab.querySelector('.tabs-block__item-title')
        const body = tab.querySelector('.tabs-block__item-body')
        if (!title || !body) return
        list.append(title)
        title.addEventListener('click', () => {
            tabsBlock.querySelectorAll('.active')?.forEach((i) => i.classList.remove('active'))
            title.classList.add('active')
            body.classList.add('active')
            const listRect = list.getBoundingClientRect()
            const itemRect = title.getBoundingClientRect()
            const left = itemRect.left - listRect.left
            const right = listRect.right - itemRect.right
            tabsBlock.style.setProperty('--line-left', `${left}px`)
            tabsBlock.style.setProperty('--line-right', `${right}px`)
        })
        if (index === 0) title.click()
    })
})
//# sourceMappingURL=tabs-block.js.map
