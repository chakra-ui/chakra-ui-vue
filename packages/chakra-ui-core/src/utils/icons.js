import { merge } from 'lodash-es'

/**
 * @param {String} prefix - prefix for the icon pack
 * @param {Array} icon - icon definition
 * @returns {{path: string, viewBox: string, attrs: *}}
 */
const createIcon = (prefix, icon) => {
  const [w, h, content, svg, data, , attrs] = icon
  let path

  const createPath = (d, attrs = {}) => `<path d="${d}" ${attrs.className ? `class="${attrs.className}"` : ''} fill="currentColor" />`

  const createGroupedPath = (groups, prefix) => {
    const paths = groups.map((d, idx) =>
      createPath(d, {
        className: idx ? `${prefix}-primary` : `${prefix}-secondary`,
      })
    )

    return `<g fill="currentColor" class="${prefix}-group">${paths.join('')}</g>`
  }

  if (prefix.startsWith('fa')) {
    path = Array.isArray(data)
      ? createGroupedPath(data, prefix.substr(0, 2))
      : createPath(data)
  } else {
    path = prefix.startsWith('fe') ? content : svg
  }

  return {
    path,
    viewBox: `0 0 ${w} ${h}`,
    attrs,
  }
}

/**
 * @description Custom parse all Icons provided by user
 * @param {Object} iconSet - Registered Icons object
 * @returns {Object}
 */
const parseIcons = (iconSet = {}) => {
  const parseIcon = (iconObject) => {
    const { icon, prefix, iconName } = iconObject
    // Is library icon
    if (icon) {
      return {
        [`${iconName}`]: createIcon(prefix, icon)
      }
    } else {
      return {}
    }
  }

  return Object.values(iconSet)
    .map(value => parseIcon(value))
    .reduce((target, source) => merge(target, source), {})
}

/**
 * @description Parse Icon packs
 * @param {Object} iconSet Registered Icon set
 * @returns {Object} Parsed pack icons object
 */
export const parsePackIcons = (iconSet) => {
  // TODO: Add support for other icon libraries
  // - Material Icons: these are string constants, and need lots of work
  // - Tailwind Icons (Hero icons)
  return parseIcons(iconSet)
}
