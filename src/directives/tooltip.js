import '@/assets/tooltip.css'

function tooltipListener(el, tooltip, options) {
  return () => {
    el.setAttribute('aria-label', tooltip.innerText)
    tooltip.setAttribute('aria-hidden', false)
    tooltip.classList.add('active')

    setTimeout(() => {
      el.setAttribute('aria-label', '')
      tooltip.classList.remove('active')
      tooltip.setAttribute('aria-hidden', true)
    }, options.duration || 1500)
  }
}

export default {
  mounted(el, { value, modifiers }) {
    const { top, bottom, left, right, text, duration } = value
    const { hover, click, focus } = modifiers

    const tooltip = document.createElement('span')
    tooltip.classList.add('tooltip')
    if (top) tooltip.style.top = top
    if (bottom) tooltip.style.bottom = bottom
    if (left) tooltip.style.left = left
    if (right) tooltip.style.right = right
    tooltip.innerText = text

    el.style.position = 'relative'
    el.append(tooltip)
    const listener = tooltipListener(el, tooltip, {duration})

    if (click) el.addEventListener('click', listener)
    if (hover) el.addEventListener('pointerenter', listener)
    if (focus) el.addEventListener('focus', listener)
  }
}