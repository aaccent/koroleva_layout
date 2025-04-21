import { isMobile } from 'globals/adaptive'
import { createMutationObserver } from 'features/mutationObserver'

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

function stickyCardInfo() {
    const PADDING = 48
    const cartList = document.querySelector<HTMLElement>('.cart__list')
    const cartInfo = document.querySelector<HTMLElement>('.cart__info')
    if (!cartInfo || !cartList) return

    if (cartList.childElementCount <= 2) {
        cartList.removeAttribute('style')
        cartInfo.classList.remove('_sticky')
        return
    }

    cartInfo.classList.add('_sticky')
    const cartHeader = document.querySelector<HTMLElement>('.cart__header')
    const cartInfoTop = cartInfo.getBoundingClientRect().top
    const cartHeaderBottom = cartHeader?.getBoundingClientRect().bottom || 0
    const cartListHeight = cartInfoTop - cartHeaderBottom - PADDING

    cartList.style.height = cartListHeight + 'px'
}

function init() {
    const cartPopup = document.querySelector('.cart-popup')
    if (!cartPopup) return

    const cartButton = document.querySelector('.cart__button') as HTMLElement
    cartButton.textContent = isMobile ? 'к оформлению' : 'Перейти к оформлению'

    const cartList = document.querySelector('.cart__list')

    if (!cartList) return

    createMutationObserver(cartList, stickyCardInfo)
}
init()
