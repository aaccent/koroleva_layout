import IMask from 'imask'
const telInputs = document.querySelectorAll('input[type="tel"]')
const maskOptions = {
    mask: '+{7}(000)000-00-00',
}
telInputs.forEach((input) => IMask(input, maskOptions))
//# sourceMappingURL=inputMask.js.map
