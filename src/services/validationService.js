export function validationWrapper(fieldName, options=[]) {
  return function validateField(field, minlength) {
    if (!field) return `${fieldName} is required`

    if (field.length < minlength) {
      return `A ${fieldName} must be at least ${minlength} characters long`
    }

    for (let option of options) {
      const regexp = option.regexp
      if (regexp && !regexp.test(field)) {
        return option.message
      }
    }

    return ''
  }
}