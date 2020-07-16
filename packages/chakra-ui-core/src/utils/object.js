import { pickBy, startsWith } from 'lodash-es'
import styleProps from '../config/props'
import { camelize } from './strings'

/**
 * Clears out all undefined properties from an object.
 * @param {Object} props
 * @returns {Object} Sanitized object with defined values.
 */
export function pickProperty (props) {
  const pure = {}
  for (const prop in props) {
    if (props[prop] !== undefined) {
      pure[prop] = props[prop]
    }
  }
  return pure
}

/**
 * Extracts pseudo style props from props objects
 * @param {Object} props
 * @returns {Object} Pseudo styles object
 */
export function filterPseudo (props) {
  const pseudos = pickBy(props, (_value, key) => {
    return startsWith(key, '_')
  })
  return pseudos
}

/**
 * Extracts style props from merged spseudo styes object
 * @param {Object} props
 * @returns {Object} Base styles object
 */
export function filterBaseStyles (props) {
  const pseudos = pickBy(props, (_value, key) => {
    return !startsWith(key, '_')
  })
  return pseudos
}

/** Filter attrs and return object of chakra props */
export function extractChakraAttrs (attrs) {
  const styleAttrs = {}
  const nativeAttrs = {}

  for (const _prop in attrs) {
    const prop = camelize(_prop)
    if (styleProps[prop]) {
      styleAttrs[prop] = attrs[_prop]
    } else {
      nativeAttrs[_prop] = attrs[_prop]
    }
  }
  return { styleAttrs, nativeAttrs }
}

/**
 * Check if a given value is a non-null object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a non-null object, else `false`.
 */
export function isNonNullObject (value) {
  return typeof value === 'object' && value !== null
}

/**
 * Checks if object has a specific property.
 * @param {Object} obj
 * @param {String} prop
 */
export const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

/**
 * Checks to see if objects in empty
 * @param {Object} object
 */
export function isEmpty (object) {
  for (const key in object) {
    // Should iterate only once
    if (hasOwn(object, key)) {
      return false
    }
    return true
  }
}

/**
 * Splits user styles into base and pseudo styles
 * @param {Object} props styles objects
 * @returns {{ baseStyles: Object, pseudoStyles: Object }}
 */
export function splitProps (props) {
  const baseStyles = {}
  const pseudoStyles = {}

  const styles = {
    baseStyles,
    pseudoStyles
  }

  if (!props || isEmpty(props)) {
    return styles
  }

  for (const key in props) {
    if (key.startsWith('_')) {
      styles.pseudoStyles[key] = props[key]
    } else {
      styles.baseStyles[key] = props[key]
    }
  }

  return styles
}
