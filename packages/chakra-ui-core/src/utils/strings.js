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
  return text &&
  text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
}

/**
 * Converts a kebab-case string into camel case
 * @param {String} string
 */
export function camelize (string) {
  return string.replace(/[.-](\w|$)/g, function (_, x) {
    return x.toUpperCase()
  })
}
