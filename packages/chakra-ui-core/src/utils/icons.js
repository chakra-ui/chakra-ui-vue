import { merge } from 'lodash-es'

/**
 * @param {String} pack
 * @param {Array} icon
 * @returns {{path: string, viewBox: string, attrs: *}}
 */
const createIcon = (pack, icon) => {
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

  if (pack === 'fa') {
    path = Array.isArray(data)
      ? createGroupedPath(data, pack)
      : createPath(data)
  } else {
    path = pack.startsWith('fe') ? content : svg
  }

  return {
    path,
    viewBox: `0 0 ${w} ${h}`,
    attrs,
  }
}

/**
 * @description Custom parse all Icons provided by user
 * @param {String} pack - the name of the icon pack being used (fe, fa, mdi, etc)
 * @param {Object} iconSet - Registered Icons object
 * @returns {Object}
 */
const parseIcons = (pack, iconSet = {}) => {
  const parseIcon = (iconObject) => {
    const { icon, iconName } = iconObject
    // Is library icon
    if (icon) {
      return {
        [`${iconName}`]: createIcon(pack, icon)
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
 * @param {String} pack - the name of the icon pack being used (fe, fa, mdi, etc)
 * @param {Object} iconSet Registered Icon set
 * @returns {Object} Parsed pack icons object
 */
export const parsePackIcons = (pack, iconSet) => {
  // TODO: Add support for other icon libraries
  // - Material Icons: these are string constants, and need lots of work
  // - Tailwind Icons (Hero icons)
  return parseIcons(pack, iconSet)
}
