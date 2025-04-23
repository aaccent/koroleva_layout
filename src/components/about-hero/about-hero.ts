import { getCoords } from 'features/page-coords'

document.querySelector('.about-hero__button')?.addEventListener('click', () => {
    const goals = document.querySelector<HTMLElement>('.about-goals')
    const header = document.querySelector<HTMLElement>('.header')

    if (!goals || !header) return

    const coords = getCoords(goals)
    const top = coords.y - header.offsetHeight - 15

    scrollTo({ behavior: 'smooth', top, left: 0 })
})
