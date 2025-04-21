import { ShopElement } from 'ui/popups/shops-popup/shops-popup'

void (function () {
    const citySelector = document.querySelector('.shops__selector')
    const cities = document.querySelectorAll('.shops__selector-item')
    const activeCityValueElement = document.querySelector('.shops__selector-value')

    if (!cities.length || !citySelector) return

    const initActiveCity = cities[0].textContent
    if (activeCityValueElement) activeCityValueElement.textContent = initActiveCity
    const initActiveCityId = cities[0].querySelector<HTMLInputElement>('input')?.value
    const initActiveShop = document.querySelector<ShopElement>(`.shops .shops__item[data-id='${initActiveCityId}']`)
    initActiveShop?.classList.add('_active')

    citySelector?.addEventListener('click', () => {
        citySelector.classList.toggle('_opened')
    })

    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) return
            citySelector?.classList.remove('_opened')

            const id = city.querySelector<HTMLInputElement>('input')?.value
            const activeShop = document.querySelector(`.shops__item[data-id='${id}']`)
            document.querySelector('.shops__item._active')?.classList.remove('_active')
            activeShop?.classList.add('_active')
        })
    })
})()
