'use strict'
const geoNotification = document.querySelector('.geo-notification')
document.body.append(geoNotification || '')
setTimeout(() => geoNotification?.classList.add('active'), 3000)
document.querySelectorAll('[data-close-geo]').forEach((button) => {
    button.addEventListener('click', () => {
        const geoNotification = document.querySelector('.geo-notification')
        geoNotification?.classList.remove('active')
    })
})
//# sourceMappingURL=geo-notification.js.map
