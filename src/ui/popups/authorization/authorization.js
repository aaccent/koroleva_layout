'use strict'
void (function () {
    const telBody = document.querySelector('.authorization-popup__tel')
    const codeBody = document.querySelector('.authorization-popup__code')
    if (!telBody || !codeBody) return
    telBody.classList.add('_active')
    let timer
    telBody.addEventListener('form-sent', () => {
        const telValue = telBody.querySelector('input[name="tel"]')?.value
        const telValueElement = codeBody.querySelector('.authorization-popup__tel-value')
        if (!telValueElement || !telValue) return
        telValueElement.textContent = ' ' + telValue
        telBody.classList.remove('_active')
        codeBody.classList.add('_active')
        const getCodeElement = document.querySelector('.authorization-popup__code-get')
        const getNewCodeIn = 60
        const setTimer = () => {
            const timerElement = document.querySelector('.authorization-popup__code-timer span')
            if (!timerElement) return
            timerElement.textContent = ` ${getNewCodeIn} сек.`
            getCodeElement?.classList.remove('_visible')
            timer = setTimeout(function tick() {
                if (parseInt(timerElement.textContent) === 1) {
                    clearTimeout(timer)
                    getCodeElement?.classList.add('_visible')
                } else {
                    timerElement.textContent = ` ${parseInt(timerElement.textContent) - 1} сек.`
                    timer = setTimeout(tick, 1000)
                }
            }, 1000)
        }
        getCodeElement?.addEventListener('click', setTimer)
        setTimer()
    })
    const hiddenInput = codeBody.querySelector('input[type="hidden"]')
    const codeSentButton = codeBody.querySelector('.authorization-popup__body-button')
    codeSentButton?.addEventListener('click', () => {
        const invalidCode = fullCode.some((codeItem) => !codeItem)
        if (invalidCode) {
            codeInputsContainer?.classList.add('_invalid')
            codeSentButton.disabled = true
        } else {
            if (hiddenInput) hiddenInput.value = fullCode.join('')
            codeBody.requestSubmit()
        }
    })
    const codeInputsContainer = codeBody.querySelector('.authorization-popup__code-inputs')
    const codeInputs = document.querySelectorAll('.authorization-popup__code-item')
    let fullCode = new Array(codeInputs.length).fill('')
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            codeInputsContainer?.classList.remove('_invalid')
            codeSentButton?.removeAttribute('disabled')
            const nextInput = input.nextElementSibling instanceof HTMLInputElement ? input.nextElementSibling : null
            const previousInput =
                input.previousElementSibling instanceof HTMLInputElement ? input.previousElementSibling : null
            if (!input.value) {
                input.classList.remove('_has-value')
                previousInput?.focus()
                fullCode[index] = ''
            } else {
                input.classList.add('_has-value')
                nextInput?.focus()
                fullCode[index] = input.value
            }
        })
    })
    const changeTelButton = codeBody.querySelector('.authorization-popup__tel-change')
    changeTelButton?.addEventListener('click', () => {
        codeBody.classList.remove('_active')
        telBody.classList.add('_active')
        clearTimeout(timer)
    })
})()
//# sourceMappingURL=authorization.js.map
