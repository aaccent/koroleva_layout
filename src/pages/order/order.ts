import 'pages/order/order-step/order-step'
import './user-data/user-data'
import './delivery/delivery'
import './payment/payment'
import { validateUserData } from 'pages/order/user-data/user-data'

void (function () {
    validateUserData()
    const firstStep = document.querySelector('.order-step:nth-child(2)')
    firstStep?.classList.add('_opened')
})()
