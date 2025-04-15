import 'pages/order/order-step/order-step'
import './user-data/user-data'
import './delivery/delivery'
import './payment/payment'

void (function () {
    const firstStep = document.querySelector('.order-step:nth-child(1)')
    firstStep?.classList.add('_opened')
})()
