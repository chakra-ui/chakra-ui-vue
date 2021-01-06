/**
 *
 * @param {String} src Script source string
 * @param {HTMLElement} container container in which to insert script
 */
function loadCarbonScript (src, container) {
  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.src = src
  container.appendChild(script)
  return script
}

export default loadCarbonScript
