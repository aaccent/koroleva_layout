import { testCartInfo, testCartInfo2, testCartProducts, testCartProducts2 } from '@/test-cart'
import { isMobile } from 'globals/adaptive'

export interface ProductInfo {
    id: number | string
    image: string
    title: string
    size: string
    amount: number
    price: number
    discountPrice?: number
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
    Object.entries(info).forEach(([key, value]) => {
        const dataEl = item.querySelector<DataItemElement>(`[data-item = ${key}]`)
        if (!dataEl) return

        if (dataEl instanceof HTMLImageElement) return (dataEl.src = value)

        if (key === 'amount' && !value) {
            item.classList.add('_out-of-stock')
        } else if (key === 'amount' && value) {
            item.classList.remove('_out-of-stock')
        }

        dataEl.textContent = key === 'price' || key === 'discountPrice' ? value + ' ₽' : value
    })
}

function addItems(list: ProductInfo[]) {
    document.querySelector('.cart__inner')?.classList.remove('_empty')

    const cartList = document.querySelector<HTMLElement>('.cart__list')
    const layout = document.querySelector<HTMLElement>('.cart__item._layout')
    if (!cartList || !layout) return

    list.forEach((info) => {
        const itemInCart = cartList.querySelector<HTMLElement>(`.cart__item[data-id='${info.id}']`)
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

function setItems(list: ProductInfo[]) {
    clearCart()
    addItems(list)
}

function clearCart() {
    const items = document.querySelectorAll('.cart__item')
    const cartInner = document.querySelector('.cart__inner')
    items.forEach((items) => items.remove())
    cartInner?.classList.add('_empty')
}

function removeItem(id: number | string) {
    const itemToRemove = document.querySelector(`.cart__item[data-id='${id}']`)
    const lastItem = !(itemToRemove?.nextElementSibling || itemToRemove?.previousElementSibling)

    itemToRemove?.remove()
    if (lastItem) clearCart()
    stickyCardInfo()
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
//setTimeout(() => addItems(testCartProducts2), 5000)

setCartInfo(testCartInfo)
//setTimeout(() => removeItem(1), 3000)

const cartButton = document.querySelector('.cart__button') as HTMLElement
cartButton.textContent = isMobile ? 'к оформлению' : 'Перейти к оформлению'
