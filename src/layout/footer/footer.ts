void (function () {
    const footerLists = document.querySelectorAll('.footer__list')

    footerLists.forEach((list) => {
        list.addEventListener('click', () => list.classList.toggle('_opened'))
    })
})()
