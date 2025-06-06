import 'components/product-hero/product-hero'
import { openPopup } from 'features/popup/popup'

document.querySelector('.product-hero__images')?.addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).classList.contains('product-hero__images-item')) return
    openPopup('images')
})
