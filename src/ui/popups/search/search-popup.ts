void (function () {
    const emptyTextSpan = document.querySelector<HTMLElement>('.search-popup__empty-text span')

    if (!emptyTextSpan) return

    document.querySelector('.search-popup__input input')?.addEventListener('input', (e) => {
        emptyTextSpan.innerText = (e.currentTarget as HTMLInputElement)?.value || ''
    })
})()
