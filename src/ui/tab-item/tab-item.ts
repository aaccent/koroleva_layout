document.querySelectorAll('.tab-item:not(.tab-item--not-interactive)').forEach((tabItem) => {
    const button = tabItem.querySelector('.tab-item__title-wrapper')
    button?.addEventListener('click', () => {
        tabItem.classList.toggle('opened')
    })
})
