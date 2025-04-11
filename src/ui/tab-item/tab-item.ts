document.querySelectorAll('[data-action="tab-action"]').forEach((tabItemButton) => {
    const tabItem = tabItemButton.closest('.tab-item:not(.tab-item--not-interactive)')

    if (!tabItem) return

    tabItemButton?.addEventListener('click', () => {
        tabItem.classList.toggle('opened')
    })
})
