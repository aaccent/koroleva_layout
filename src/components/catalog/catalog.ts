interface ViewPartElement extends HTMLElement {
    dataset: {
        view: string
    }
}

const catalogList = document.querySelector<ViewPartElement>('.catalog__products-list')

document.querySelectorAll<ViewPartElement>('[data-action="view"]').forEach((viewButton) => {
    viewButton.addEventListener('click', () => {
        if (!catalogList || !viewButton.dataset.view) return

        document.querySelector('[data-action="view"].active')?.classList.remove('active')
        viewButton.classList.add('active')
        catalogList.dataset.view = viewButton.dataset.view
    })
})
