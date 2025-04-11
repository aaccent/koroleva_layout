import { CartInfo, ProductInfo } from 'ui/popups/cart/cart'

export const testCartProducts: ProductInfo[] = [
    {
        id: 1,
        image: 'assets/content/products/card-2.jpg',
        title: 'Корсет panama черный',
        size: 'XS/черный',
        amount: 1,
        price: 5000,
        discountPrice: 4300,
    },
    {
        id: 2,
        image: 'assets/content/products/card-1.jpg',
        title: 'купальник Однотонный с открытой спинойота',
        size: 'XS/черный',
        amount: 0,
        price: 5000,
    },
    {
        id: 3,
        image: 'assets/content/products/card-3.jpg',
        title: 'Бюстгальтер бандо с тонкой чашкой и съёмными бретелями',
        size: 'XS/черный',
        amount: 1,
        price: 5000,
        discountPrice: 4300,
    },
    {
        id: 4,
        image: 'assets/content/products/card-4.jpg',
        title: 'Корсет panama черный',
        size: 'XS/черный',
        amount: 1,
        price: 5000,
    },
]

export const testCartProducts2: ProductInfo[] = [
    {
        id: 1,
        image: 'assets/content/products/card-2.jpg',
        title: 'Корсет panama черный',
        size: 'XS/черный',
        amount: 1,
        price: 18000,
        discountPrice: 4300,
    },
    {
        id: 4,
        image: 'assets/content/products/card-1.jpg',
        title: 'купальник Однотонный с открытой спинойота',
        size: 'XS/черный',
        amount: 1,
        price: 5000,
    },
    {
        id: 3,
        image: 'assets/content/products/card-3.jpg',
        title: 'Бюстгальтер бандо с тонкой чашкой и съёмными бретелями',
        size: 'XS/черный',
        amount: 1,
        price: 5000,
        discountPrice: 1300,
    },
    {
        id: 5,
        image: 'assets/content/products/card-4.jpg',
        title: 'Корсет panama черный',
        size: 'XS/черный',
        amount: 1,
        price: 5000,
    },
]

export const testCartInfo: CartInfo = {
    price: 8600,
    delivery: 0,
    discount: -500,
}

export const testCartInfo2: CartInfo = {
    price: 114569,
    delivery: 900,
    discount: 0,
}
