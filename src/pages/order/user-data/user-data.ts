import { setFinalData } from 'pages/order/order-step/order-step'
import { validateForm } from 'features/forms'
import { isDesktop } from 'globals/adaptive'

interface FinalUserData {
    name: string[]
    tel: string
    email: string
}

export function validateUserData() {
    const userDataStep = document.querySelector('[data-step="user-data"]')
    const userDataForm = document.querySelector<HTMLElement>('.user-data__form')
    if (!userDataForm || !userDataStep) return

    const finalUserData: FinalUserData = {
        name: [],
        tel: '',
        email: '',
    }

    const inputs = userDataForm.querySelectorAll('input')
    if (!validateForm(userDataForm)) {
        userDataStep.classList.remove('_valid')
        return
    }

    inputs.forEach((input) => {
        switch (input.name) {
            case 'first-name':
                finalUserData.name[1] = input.value
                break
            case 'last-name':
                finalUserData.name[0] = input.value
                break
            case 'middle-name':
                finalUserData.name[2] = input.value
                break
            case 'tel':
                finalUserData.tel = input.value
                break
            case 'email':
                finalUserData.email = input.value
        }
    })

    setFinalData(finalUserData)
    userDataStep.classList.add('_valid')
}

void (function () {
    if (isDesktop) return
})()
