function checkFormFilling(
    form: HTMLFormElement,
    submitButton: HTMLButtonElement,
    requiredInputs: NodeListOf<HTMLInputElement>,
) {
    const formData = new FormData(form)
    const checkedInputs = new Set<string>()

    let disable = false
    for (const input of requiredInputs) {
        console.log(input)
        if (checkedInputs.has(input.name)) continue
        if (formData.get(input.name)) continue

        checkedInputs.add(input.name)
        disable = true
        break
    }

    submitButton.disabled = disable
}

document.querySelectorAll<HTMLFormElement>('form[data-check-fill]').forEach((form) => {
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"],[data-submit-button]')

    if (!submitButton) return

    const requiredInputs = form.querySelectorAll<HTMLInputElement>('input[required]')

    checkFormFilling(form, submitButton, requiredInputs)
    form.addEventListener('change', () => checkFormFilling(form, submitButton, requiredInputs))
})
