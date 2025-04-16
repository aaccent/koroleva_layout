import { closeActivePopup, PopupOpenedCustomEvent } from 'features/popup/popup'
import { getAddressList } from '@/methods/getAddressList'
import { validateForm } from 'features/forms'
import { setFinalData, validateStep } from 'pages/order/order-step/order-step'
import { DeliveryPopup } from 'pages/order/delivery/delivery'

function addHiddenInput(input: HTMLInputElement) {
    const container = document.querySelector('[data-step="delivery"]')
    if (!container) return
    const hiddenInput = input.cloneNode(true) as HTMLInputElement
    hiddenInput.setAttribute('type', 'hidden')
    container.append(hiddenInput)
}

void (function () {
    const courierPopup = document.querySelector<DeliveryPopup>('.courier-popup')
    if (!courierPopup) return

    courierPopup.addEventListener('opened', (customEvent) => {
        const onSaveBtnClick = (event: MouseEvent) => {
            const saveButton = event.target as HTMLButtonElement

            const addressInputsContainer = document.querySelector<HTMLElement>('.courier-popup__inputs')
            if (!addressInputsContainer || !validateForm(addressInputsContainer)) return

            const callPopupElement = (customEvent as PopupOpenedCustomEvent).detail.trigger
            if (!callPopupElement) return

            const method = courierPopup.dataset.method
            const address = addressInputsContainer.querySelector<HTMLInputElement>('input[name="street"]')?.value || ''

            setFinalData({
                method: method.trim(),
                address: address.trim(),
            })

            addressInputsContainer.querySelectorAll('input').forEach((input) => addHiddenInput(input))
            validateStep(callPopupElement)

            saveButton.removeEventListener('click', onSaveBtnClick)
            closeActivePopup()
        }

        const courierButton = courierPopup.querySelector<HTMLButtonElement>('.courier-popup__button')
        courierButton?.addEventListener('click', onSaveBtnClick)
    })

    const addressWrapper = document.querySelector('.courier-popup__address-list-wrapper')
    const addressList = addressWrapper?.querySelector('.courier-popup__address-list')
    const streetInput = courierPopup?.querySelector<HTMLInputElement>('input[name="street"]')

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
                li.classList.add('courier-popup__address-item')
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
