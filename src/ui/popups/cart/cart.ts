import { testCartInfo, testCartProducts } from '@/test-cart'
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

interface DataItemElement extends HTMLElement {
    dataset: {
        item: keyof ProductInfo
    }
}

interface CartInfoElement extends HTMLElement {
    dataset: {
        info: keyof CartInfo
    }
}

function init() {
    const cartPopup = document.querySelector('.cart.popup')
    if (!cartPopup) return

    const cartButton = document.querySelector('.cart__button') as HTMLElement
    cartButton.textContent = isMobile ? 'к оформлению' : 'Перейти к оформлению'

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

    function updateItemInfo(item: HTMLElement, info: ProductInfo) {
        switch (info.type) {
            case 'product':
                Object.entries(info).forEach(([key, value]) => {
                    const dataEl = item.querySelector<DataItemElement>(`[data-item = ${key}]`)
                    switch (key) {
                        case 'amount':
                            if (!value) {
                                item.classList.add('_out-of-stock')
                            } else {
                                item.classList.remove('_out-of-stock')
                            }
                    }
                    if (!dataEl) return
                    if (dataEl instanceof HTMLImageElement) {
                        dataEl.src = value.toString()
                        return
                    }

                    dataEl.textContent = key === 'price' || key === 'discountPrice' ? value + '₽' : value.toString()
                })
                break
            case 'gift-card':
                const image = item.querySelector<HTMLImageElement>('.product-item__image')
                const title = item.querySelector('.product-item__title')
                const size = item.querySelector('.product-item__size')
                const amount = item.querySelector('.product-item__amount-value')
                const price = item.querySelector('.product-item__price')

                if (!image || !title || !size || !amount || !price) return

                image.src = 'assets/static/gift-card-in-cart.png'
                title.textContent = 'подарочная карта'
                size.textContent = `Номинал: ${info.price} ₽`
                amount.textContent = info.amount.toString()
                price.textContent = info.price + '₽'
                break
        }
    }

    const addItems = (list: ProductInfo[]) => {
        document.querySelector('.cart__inner')?.classList.remove('_empty')

        const cartList = document.querySelector<HTMLElement>('.cart__list')
        const layout = cartPopup.querySelector<HTMLElement>('.product-item._layout')
        if (!cartList || !layout) return

        list.forEach((info) => {
            const itemInCart = cartList.querySelector<HTMLElement>(`.product-item[data-id='${info.id}']`)
            if (itemInCart) {
                updateItemInfo(itemInCart, info)
                return
            }

            const clone = layout.cloneNode(true) as HTMLElement
            clone.classList.remove('_layout')
            clone.dataset.id = info.id.toString()

            updateItemInfo(clone, info)
            cartList.append(clone)
        })

        stickyCardInfo()
    }

    const clearCart = () => {
        const items = cartPopup.querySelectorAll('.product-item')
        const cartInner = document.querySelector('.cart__inner')
        items.forEach((items) => items.remove())
        cartInner?.classList.add('_empty')

        const cartAmount = document.querySelector('.cart__title span')
        if (cartAmount) cartAmount.textContent = '0'
    }

    const removeItem = (id: number | string) => {
        const itemToRemove = cartPopup.querySelector(`.product-item[data-id='${id}']`)
        const lastItem = !(itemToRemove?.nextElementSibling || itemToRemove?.previousElementSibling)

        itemToRemove?.remove()
        stickyCardInfo()
        if (lastItem) clearCart()
    }

    function setCartInfo(info: CartInfo) {
        const cartInfoElements = document.querySelectorAll<CartInfoElement>('.cart__info-item[data-info]')
        cartInfoElements.forEach((element) => {
            const dataInfo = element.dataset.info
            const value = element.firstElementChild
            if (!value) return

            if (!!info[dataInfo]) {
                element.classList.remove('_empty')
                value.textContent =
                    dataInfo === 'price' || dataInfo === 'discount' ? info[dataInfo] + ' ₽' : info[dataInfo]?.toString()
            } else {
                element.classList.add('_empty')
            }
        })
    }

    addItems(testCartProducts)
    setCartInfo(testCartInfo)
}
init()
