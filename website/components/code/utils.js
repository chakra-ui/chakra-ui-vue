export function getLanguage (string) {
  return string.slice(string.indexOf('-') + 1)
}

export function tryParseBoolean (value) {
  if (typeof value === 'boolean')
    return value

  if (typeof value === 'string')
    return value.toLocaleLowerCase() === 'true'

  if (typeof value === 'number')
    return !!value

  return null
}

export function hasValue (value) {
  return ![null, undefined].includes(value)
}
