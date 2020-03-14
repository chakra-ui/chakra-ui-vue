export const stringToUrl = (str, path = '/') => {
  return `${path}${str
    .toLowerCase()
    .split(' ')
    .join('-')}`
}
