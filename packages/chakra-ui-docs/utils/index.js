import { topNavLinks, components, aboutNavLinks } from './all-routes'

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

export const findNextAndPrevRoute = (path) => {
  const orderedRoutes = [...topNavLinks, ...aboutNavLinks, ...components]

  const extractedRoutes = []
  orderedRoutes.forEach((singleRoute) => {
    extractedRoutes.push({ name: singleRoute, path: stringToUrl(singleRoute) })
  })

  const currentRouteIndex = extractedRoutes.map(route => route.path).indexOf(path)

  const nextPage = extractedRoutes[currentRouteIndex + 1]
  const prevPage = extractedRoutes[currentRouteIndex - 1]

  return { prev: prevPage || '', next: nextPage || '' }
}
