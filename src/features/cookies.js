export const COOKIES = {
    COOKIE_NOTIFICATION: 'cookie-notification',
}
export function parseCookies(cookiesStr) {
    const cookies = cookiesStr
        .split(';')
        .map((i) => i.trim().split('='))
        .map((i) => ({ name: i[0], value: i[1] }))
    return {
        get(name) {
            return cookies.find((i) => i.name === name)
        },
        all() {
            return cookies
        },
    }
}
export function cookies() {
    return parseCookies(document.cookie)
}
export const ONE_MONTH_IN_SECONDS = 30 * 24 * 60 * 60
export const ONE_YEAR_IN_SECONDS = ONE_MONTH_IN_SECONDS * 12
export function setCookie(name, value, options) {
    const _options = Object.assign(
        {
            maxAge: ONE_MONTH_IN_SECONDS,
            path: '/',
        },
        options,
    )
    document.cookie = `${name}=${value}; Max-Age=${_options.maxAge}; Path=${_options.path};`
}
//# sourceMappingURL=cookies.js.map
