'use strict'
document.querySelectorAll('.rounded-input__clear-button').forEach((button) => {
    button.addEventListener('click', () => {
        const input = button.closest('.rounded-input')?.querySelector('input')
        if (!input) return
        input.value = ''
    })
})
//# sourceMappingURL=rounded-input.js.map
