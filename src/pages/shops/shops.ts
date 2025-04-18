void (function () {
    const activeCityValueElement = document.querySelector('.shops__selector-value')
    if (!activeCityValueElement) return
    const activeCity = activeCityValueElement.textContent

    const activeShop = document.querySelector(`.shops__item[data-city=${activeCity}]`)
    activeShop?.classList.add('_active')

    const citySelector = document.querySelector('.shops__selector')
    if (!citySelector) return

    citySelector.addEventListener('click', () => {
        citySelector.classList.toggle('_opened')
    })

    document.querySelectorAll('.shops__selector-item').forEach((city) => {
        city.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) return

            const value = city.querySelector<HTMLInputElement>('input')?.value
            if (value) activeCityValueElement.textContent = value
            citySelector?.classList.remove('_opened')

            const activeShop = document.querySelector(`.shops__item[data-city=${value}]`)
            document.querySelector('.shops__item._active')?.classList.remove('_active')
            activeShop?.classList.add('_active')
        })
    })
})()
