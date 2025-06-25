import { validateUserData } from 'components/user-data/user-data'
import { isMobile } from 'globals/adaptive'
export function setFinalData(data) {
    Object.entries(data).forEach(([key, value]) => {
        const element = document.querySelector(`[data-final='${key}']`)
        if (!element) return
        element.textContent = value
    })
}
export function validateStep(callPopupElement) {
    const callPopupStep = callPopupElement.closest('.order-step')
    const callPopupInput = callPopupElement.querySelector('input')
    callPopupStep?.classList.add('_valid')
    if (callPopupInput) callPopupInput.checked = true
}
function validateSteps(clickedStep) {
    validateUserData()
    const prevInvalidStep = document.querySelector(
        `.order-step:is(:not(._valid)):has(~[data-step='${clickedStep.dataset.step}'])`,
    )
    if (!prevInvalidStep) {
        document.querySelector('.order-step._opened')?.classList.remove('_opened')
        clickedStep.classList.add('_opened')
        return
    }
}
function replaceButtons() {
    const actionButtons = document.querySelectorAll('.order-step__action-button')
    actionButtons.forEach((button) => {
        const closestStepHeader = button.closest('.order-step__header')
        if (!closestStepHeader) return
        closestStepHeader.insertAdjacentElement('afterend', button)
    })
    const changeStepButtons = document.querySelectorAll('.order-step__change-button')
    changeStepButtons.forEach((button) => {
        const closestStep = button.closest('.order-step')
        if (!closestStep) return
        closestStep.insertAdjacentElement('beforeend', button)
    })
}
void (function () {
    const steps = document.querySelectorAll('.order-step')
    steps.forEach((step) => {
        step.addEventListener('click', () => {
            if (step.classList.contains('_opened')) {
                return
            }
            validateSteps(step)
        })
    })
    if (isMobile) replaceButtons()
})()
//# sourceMappingURL=order-step.js.map
