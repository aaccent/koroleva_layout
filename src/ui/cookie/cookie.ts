import { COOKIES, cookies, ONE_YEAR_IN_SECONDS, setCookie } from 'features/cookies'

const cookie = document.querySelector('.cookie')
if (!cookies().get(COOKIES.COOKIE_NOTIFICATION)) {
    cookie?.classList.add('showed')
}

document.querySelector('.cookie__button')?.addEventListener('click', () => {
    setCookie(COOKIES.COOKIE_NOTIFICATION, 'accepted', { maxAge: ONE_YEAR_IN_SECONDS })
    cookie?.classList.remove('showed')
})
