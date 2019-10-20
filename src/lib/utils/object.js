import pickBy from 'lodash-es/pickBy'
import startsWith from 'lodash-es/startsWith'

/**
 * @description Clears out all undefined properties from an object.
 * @param {Object} props
 * @returns {Object} Sanitized object with defined values.
 */
export function pickProperty (props) {
  const pure = pickBy(props, (prop) => !!prop)
  return pure
}

export function filterPseudo (props) {
  const pseudos = pickBy(props, (_value, key) => {
    return startsWith(key, '_')
  })
  return pseudos
}
