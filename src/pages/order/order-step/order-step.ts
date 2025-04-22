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

        validateSteps(step)
    })
})

function validateSteps(clickedStep: OrderStep) {
    validateUserData()

    const prevInvalidStep = document.querySelector<OrderStep>(
        `.order-step:is(:not(._valid)):has(~[data-step='${clickedStep.dataset.step}'])`,
    )
    if (!prevInvalidStep) {
        document.querySelector('.order-step._opened')?.classList.remove('_opened')
        clickedStep.classList.add('_opened')
        return
    }
}
