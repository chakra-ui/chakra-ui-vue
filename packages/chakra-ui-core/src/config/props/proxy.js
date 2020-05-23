import aliases from './props.aliases'

/**
 * Proxies customized props values to styled-system prop values
 * @param {Object} props Style props object
 * @returns {Object} Final props object
 */
export const proxyAliases = (props) => {
  const _props = {}
  Object.keys(props).forEach((key) => {
    // If is aliased props
    if (aliases[key]) {
      // If single resolve
      if (typeof aliases[key] === 'string') {
        _props[aliases[key]] = props[key]
        return
      }
      // If array resolve
      if (Array.isArray(aliases[key])) {
        aliases[key].map((declaration) => {
          _props[declaration] = props[key]
        })
        return
      }
    }
    // If is not aliased
    _props[key] = props[key]
  })

  return _props
}
