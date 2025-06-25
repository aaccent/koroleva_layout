import { isMobile } from 'globals/adaptive'
document.querySelectorAll('.selector').forEach((selector) => {
    const itemInputs = selector.querySelectorAll('.selector__item-input')
    const button = selector.querySelector('.selector__button')
    const closeButton = selector.querySelector('.close-btn')
    if (!button) return
    button.addEventListener('mouseover', () => {
        selector.classList.toggle('opened')
    })
    closeButton?.addEventListener('click', () => selector.classList.remove('opened'))
    selector.addEventListener('click', (event) => {
        if (event.target !== selector) return
        selector.classList.remove('opened')
    })
    if (itemInputs.length) {
        itemInputs[0].checked = true
    } else {
        const firstItem = selector.querySelector('.selector__item')
        if (!firstItem) return
        button.innerText = firstItem.textContent || ''
    }
})
document.querySelectorAll('.selector-list').forEach((selectorList) => {
    const chosenText = selectorList.closest('.tab-item')?.querySelector('.tab-item__title span')
    const itemInputs = selectorList.querySelectorAll('.selector__item-input')
    if (!chosenText) return
    itemInputs.forEach((input) => {
        input.addEventListener('change', () => {
            chosenText.innerText = input.dataset.showValue || ''
        })
    })
})
const sortSelectorValue = document.querySelector('.filter-popup__sort-selector .tab-item__title span')
const sortInputs = document.querySelectorAll('.filter-popup__sort-selector .selector__item-input')
sortInputs.forEach((input) => {
    input?.addEventListener('change', () => {
        if (sortSelectorValue) {
            sortSelectorValue.textContent = input.closest('.selector__item')?.textContent || ''
        }
    })
})
if (isMobile) {
    const selectorButtons = document.querySelectorAll('.selector__button')
    selectorButtons.forEach((button) => {
        const popup = button.closest('.filter-popup__sort-selector')
        if (popup) return
        button.textContent = ''
    })
}
//# sourceMappingURL=selector.js.map
