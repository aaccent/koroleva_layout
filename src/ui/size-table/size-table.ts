document.querySelectorAll('.size-table__tab').forEach((tab) => {
    const button = tab.querySelector('.size-table__tab-title')
    button?.addEventListener('click', () => {
        tab.classList.toggle('opened')
    })
})
