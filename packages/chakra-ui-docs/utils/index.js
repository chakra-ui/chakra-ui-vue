export const stringToUrl = (str, path = '/') => {
  return `${path}${str
    .toLowerCase()
    .split(' ')
    .join('-')}`
}

export const titleCase = (str) => {
  str = str.toLowerCase().split(' ')
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
  }
  return str.join(' ')
}

export const removeHyphenFromString = (hyphenatedString) => {
  const str = hyphenatedString.split('-')
  return str.join(' ')
}

export const findNextAndPrevRoute = (path, routes) => {
  const currentRouteIndex = routes.map(route => route.path).indexOf(path)

  const nextPageLink = routes[currentRouteIndex + 1]
  const prevPageLink = routes[currentRouteIndex - 1]

  return { prev: prevPageLink ? prevPageLink.path : '', next: nextPageLink ? nextPageLink.path : '' }
}
