import 'components/product-hero/product-hero'
import { openPopup } from 'features/popup/popup'
document.querySelector('.product-hero__images')?.addEventListener('click', (event) => {
    if (!event.target.classList.contains('product-hero__images-item')) return
    openPopup('images')
})
//# sourceMappingURL=product.js.map
