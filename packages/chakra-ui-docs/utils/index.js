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

  const nextPage = routes[currentRouteIndex + 1]
  const prevPage = routes[currentRouteIndex - 1]

  const prevPageLink = prevPage
    ? {
      ...prevPage,
      name: (prevPage.name =
          prevPage.name.charAt(0).toUpperCase() + prevPage.name.slice(1))
    }
    : ''
  const nextPageLink = nextPage
    ? {
      ...nextPage,
      name: (nextPage.name =
          nextPage.name.charAt(0).toUpperCase() + nextPage.name.slice(1))
    }
    : ''

  console.log(prevPageLink)
  console.log(nextPageLink)
  return { prev: prevPageLink, next: nextPageLink }
}
