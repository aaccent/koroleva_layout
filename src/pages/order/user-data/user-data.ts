import { setFinalData } from 'pages/order/order-step/order-step'

interface FinalUserData {
    name: string[]
    tel: string
    email: string
}

export function validateUserData() {
    const userDataStep = document.querySelector('[data-step="user-data"]')
    const userDataForm = document.querySelector('.user-data__form')
    if (!userDataForm || !userDataStep) return

    const finalUserData: FinalUserData = {
        name: [],
        tel: '',
        email: '',
    }

    const inputs = userDataForm.querySelectorAll('input')
    // inputs.forEach((input) => {
    //     if (!input.value) {
    //         input.classList.add('invalid')
    //         return
    //     }
    //
    //     if (input.type === 'tel' && input.value.replaceAll(/\D/g, '').length !== 11) {
    //         input.classList.add('invalid')
    //         return
    //     }
    //
    //     switch (input.name) {
    //         case 'first-name':
    //             finalUserData.name[1] = input.value
    //             break
    //         case 'last-name':
    //             finalUserData.name[0] = input.value
    //             break
    //         case 'middle-name':
    //             finalUserData.name[2] = input.value
    //             break
    //         case 'tel':
    //             finalUserData.tel = input.value
    //             break
    //         case 'email':
    //             finalUserData.email = input.value
    //     }
    // })
    // const invalid = !!userDataForm.querySelector('input.invalid')
    // if (invalid) {
    //     userDataStep.classList.remove('_valid')
    //     return
    // }

    //setFinalData(finalUserData)
    setFinalData({ name: 'popo', tel: '45454545454545', email: 'popopop' })
    userDataStep.classList.add('_valid')
}
