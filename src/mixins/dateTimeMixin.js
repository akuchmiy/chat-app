export function dateTimeMixin(locale = 'en-US', options = {}) {
  return function dateFilter(value) {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    return new Intl.DateTimeFormat(locale, Object.assign(defaultOptions, options)).format(value)
  }
}