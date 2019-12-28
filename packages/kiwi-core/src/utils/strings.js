import XRegExp from 'xregexp'

/**
 * @description Returns the substring after a certain character in a string.
 * @param {'String'} string
 * @param {'String'} char
 */
export function getSubstringAfterChar (string, char) {
  return string.slice(string.indexOf(char) + 1)
}

/**
 * @description Returns the substring before a certain character in a string.
 * @param {'String'} string
 * @param {'String'} char
 */
export function getSubstringBeforeChar (string, char) {
  return string.slice(0, string.indexOf(char))
}

/**
 * Transforms a string to Kebab case
 * @param {String} text String to transform to kebab case
 */
export function kebabify (text) {
  const re = new XRegExp('((\\p{Ll})(\\p{Lu})|(\\d)(\\p{Lu})|(\\p{Ll})(\\d))', 'g')

  function replace () {
    const lhs = arguments[2] || arguments[4] || arguments[6]
    const rhs = arguments[3] || arguments[5] || arguments[7]
    return lhs + '-' + rhs
  }
  return text.replace(re, replace).replace(re, replace).toLowerCase()
}
