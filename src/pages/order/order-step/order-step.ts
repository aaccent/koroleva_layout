import { validateUserData } from 'pages/order/user-data/user-data'

interface OrderStep extends HTMLElement {
    dataset: {
        step: 'user-data' | 'delivery' | 'payment'
    }
}

export function setFinalData(data: object) {
    Object.entries(data).forEach(([key, value]) => {
        const element = document.querySelector(`[data-final='${key}']`)
        if (!element) return

        element.textContent = value
    })
}

export function validateStep(callPopupElement: HTMLElement) {
    const callPopupStep = callPopupElement.closest('.order-step')
    const callPopupInput = callPopupElement.querySelector('input')
    callPopupStep?.classList.add('_valid')
    if (callPopupInput) callPopupInput.checked = true
}

const steps = document.querySelectorAll<OrderStep>('.order-step')
steps.forEach((step) => {
    step.addEventListener('click', () => {
        if (step.classList.contains('_opened')) {
            return
        }
        if (step.classList.contains('_valid')) {
            document.querySelector('.order-step._opened')?.classList.remove('_opened')
            step.classList.add('_opened')
            return
        }

        const prevStep = step.previousElementSibling as OrderStep
        if (prevStep.dataset.step === 'user-data') validateUserData()
        if (!prevStep.classList.contains('_valid')) return
        prevStep.classList.remove('_opened')
        step.classList.add('_opened')
    })
})
