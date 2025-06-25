'use strict'
function checkFormFilling(form, submitButton, requiredInputs) {
    const formData = new FormData(form)
    const checkedInputs = new Set()
    let disable = false
    for (const input of requiredInputs) {
        if (checkedInputs.has(input.name)) continue
        if (formData.get(input.name)) continue
        checkedInputs.add(input.name)
        disable = true
        break
    }
    submitButton.disabled = disable
}
document.querySelectorAll('form[data-check-fill]').forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"],[data-submit-button]')
    if (!submitButton) return
    const requiredInputs = form.querySelectorAll('input[required]')
    checkFormFilling(form, submitButton, requiredInputs)
    form.addEventListener('change', () => checkFormFilling(form, submitButton, requiredInputs))
})
//# sourceMappingURL=check-fill.js.map
