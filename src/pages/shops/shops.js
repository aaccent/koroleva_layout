import Swiper from 'swiper'
import { EffectFade, Navigation } from 'swiper/modules'
import { isMobile } from 'globals/adaptive'
void (function () {
    const citySelector = document.querySelector('.shops__selector')
    const cityList = document.querySelector('.shops__selector-list')
    const cities = document.querySelectorAll('.shops__selector-item')
    const activeCityValueElement = document.querySelector('.shops__selector-value')
    if (!cities.length || !citySelector) return
    const firstCityInput = cities[0].querySelector('input')
    if (firstCityInput) firstCityInput.checked = true
    if (activeCityValueElement) activeCityValueElement.textContent = cities[0].textContent
    const initActiveCityId = cities[0].querySelector('input')?.value
    const initActiveShop = document.querySelector(`.shops .shops-slider[data-id='${initActiveCityId}']`)
    initActiveShop?.classList.add('_active')
    citySelector.addEventListener('mouseover', () => {
        citySelector.classList.add('_opened')
    })
    cityList?.addEventListener('mouseleave', () => {
        citySelector.classList.remove('_opened')
    })
    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) return
            citySelector.classList.remove('_opened')
            const id = city.querySelector('input')?.value
            const activeShopSlider = document.querySelector(`.shops-slider[data-id='${id}']`)
            document.querySelector('.shops-slider._active')?.classList.remove('_active')
            activeShopSlider?.classList.add('_active')
            if (activeCityValueElement) activeCityValueElement.textContent = city.textContent
        })
    })
    const shopSlides = document.querySelectorAll('.shops-slider')
    shopSlides.forEach((shop) => {
        new Swiper(shop, {
            modules: [Navigation, EffectFade],
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            navigation: {
                prevEl: '.shops-slider__navigation-prev',
                nextEl: '.shops-slider__navigation-next',
            },
        })
    })
    if (isMobile) {
        const mapButton = document.querySelector('.shops__map')
        if (mapButton) mapButton.innerText = 'на карте'
    }
})()
//# sourceMappingURL=shops.js.map
