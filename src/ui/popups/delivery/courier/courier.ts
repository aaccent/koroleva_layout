import { PopupOpenedCustomEvent } from 'features/popup/popup'
import { getAddressList } from '@/methods/getAddressList'

void (function () {
    const courierPopup = document.querySelector('.courier-popup')
    if (!courierPopup) return

    courierPopup.addEventListener('opened', (e) => {
        const callPopupElement = (e as PopupOpenedCustomEvent).detail.trigger
    })

    const streetInput = courierPopup.querySelector<HTMLInputElement>('input[name="street"]')
    const addressWrapper = document.querySelector('.courier-popup__address-list-wrapper')
    const addressList = addressWrapper?.querySelector('.courier-popup__address-list')
    if (!addressList || !addressWrapper) return

    streetInput?.addEventListener('input', () => {
        addressList.innerHTML = ''
        getAddressList(streetInput.value).then((list) => {
            if (list.length) {
                addressWrapper?.classList.add('_visible')
            } else {
                addressWrapper?.classList.remove('_visible')
            }

            list.forEach((address) => {
                const li = document.createElement('span')
                li.classList.add('courier-address__item')
                li.textContent = address.value
                addressList?.append(li)
                li.addEventListener('click', () => {
                    const arrayValue = li.textContent?.split(',').slice(0, 2) || []
                    streetInput.value = arrayValue.join(', ')
                    addressList.innerHTML = ''
                    addressWrapper?.classList.remove('_visible')
                })
            })
        })
    })
})()

// streetInput?.addEventListener('input', () => {
//     addressList.innerHTML = ''
//
//     getAddressList(streetInput.value).then((list) => {
//
//
//
//
//
//
//         list.forEach((address) => {
//             const li = document.createElement('span')
//             li.classList.add('courier-address__item')
//             li.textContent = address.value
//             addressList?.append(li)
//
//             li.addEventListener('click', () => {
//                 const arrayValue = li.textContent?.split(',').slice(0, 2) || []
//
//                 streetInput.value = arrayValue.join(', ')
//                 addressList.innerHTML = ''
//                 addressBlock?.classList.remove('_visible')
//             })
//         })
//     })
// })
