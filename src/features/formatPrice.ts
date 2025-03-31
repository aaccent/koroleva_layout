const intlNumberFormat = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
})

export function formatPrice(rawPrice: number | string) {
    let price
    if (typeof rawPrice === 'string') {
        const noSpace = rawPrice.replaceAll(' ', '')
        price = parseInt(noSpace)
    } else {
        price = rawPrice
    }

    return intlNumberFormat.format(price)
}
