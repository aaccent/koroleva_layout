import { isMobile } from 'globals/adaptive'

export type ProductInfo =
    | {
          id: number | string
          type: 'product'
          image: string
          title: string
          size?: string
          amount: number
          price: number
          discountPrice?: number
      }
    | {
          id: number | string
          type: 'gift-card'
          image?: never
          title?: never
          size?: never
          amount: number
          price: number
          discountPrice?: never
      }

export interface CartInfo {
    price: number
    delivery?: number
    discount?: number
}

function init() {
    const cartButton = document.querySelector('.cart-popup__button')
    if (!cartButton) return
    cartButton.textContent = isMobile ? 'к оформлению' : 'Перейти к оформлению'
}
init()
