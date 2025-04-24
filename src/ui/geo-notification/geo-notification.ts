document.querySelectorAll('[data-close-geo]').forEach((button) => {
    button.addEventListener('click', () => {
        const geoNotification = document.querySelector('.geo-notification')

        geoNotification?.classList.remove('active')
    })
})
