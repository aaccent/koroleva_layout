void (function () {
    const cardPopup = document.querySelector('.card-popup')
    if (!cardPopup) return
    const popupValues = cardPopup.querySelectorAll('.card-popup__values-item')
    const values = document.querySelectorAll('.gift-card__list-item')
    values.forEach((value, index) => {
        if (!value.textContent) return
        popupValues[index].prepend(value.textContent)
        const input = popupValues[index].querySelector('input')
        if (!input) return
        input.value = value.dataset.value
    })
    cardPopup?.addEventListener('opened', (e) => {
        const trigger = e.detail.trigger
        if (!trigger) return
        popupValues.forEach((value) => {
            const input = value.querySelector('input')
            if (!input) return
            input.checked = trigger.dataset.value === input.value
        })
    })
})()
export {}
//# sourceMappingURL=card-popup.js.map
