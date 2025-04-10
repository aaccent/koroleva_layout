document.querySelectorAll('.selector').forEach((selector) => {
    const itemInputs = selector.querySelectorAll<HTMLInputElement>('.selector__item-input')
    const button = selector.querySelector<HTMLElement>('.selector__button')
    const closeButton = selector.querySelector('.close-btn')

    if (!button) return

    button.addEventListener('click', () => selector.classList.toggle('opened'))
    closeButton?.addEventListener('click', () => selector.classList.remove('opened'))
    selector.addEventListener('click', (event) => {
        if (event.target !== selector) return
        selector.classList.remove('opened')
    })

    if (itemInputs.length) {
        button.innerText = itemInputs[0].dataset.showValue || ''
        itemInputs[0].checked = true
    } else {
        const firstItem = selector.querySelector('.selector__item')
        if (!firstItem) return

        button.innerText = firstItem.textContent || ''
    }

    itemInputs.forEach((input) => {
        input.addEventListener('change', () => {
            button.innerText = input.dataset.showValue || ''
        })
    })
})

document.querySelectorAll('.selector-list').forEach((selectorList) => {
    const chosenText = selectorList.closest('.tab-item')?.querySelector<HTMLElement>('.tab-item__title span')
    const itemInputs = selectorList.querySelectorAll<HTMLInputElement>('.selector__item-input')

    if (!chosenText) return

    itemInputs.forEach((input) => {
        input.addEventListener('change', () => {
            chosenText.innerText = input.dataset.showValue || ''
        })
    })
})
