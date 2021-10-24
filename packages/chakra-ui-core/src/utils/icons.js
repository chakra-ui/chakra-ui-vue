import { merge } from 'lodash-es'

/**
 * @description Parse FontAwesome icon path
 * @param {String|Array} path a single svg path, or array of paths
 * @returns {String}
 */
const parseFontAwesomeIcon = (path) => {
  // duotone icon
  if (Array.isArray(path) && path.length === 2) {
    const paths = path.map((d, idx) =>
      `<path d="${d}" fill="currentColor" class="${idx ? 'fa-primary' : 'fa-secondary'}" />`
    )

    return `<defs><style>.fa-secondary{opacity:.4}</style></defs><g class="fa-group">${paths.join('')}</g>`
  }

  return `<path d="${path}" fill="currentColor" />`
}

/**
 * @description Custom parse all Icons provided by user
 * @param {Object} iconSet - Registered Icons object
 * @returns {Object}
 */
const parseIcons = (iconSet = {}) => {
  const parseIcon = (iconObject) => {
    const { icon } = iconObject
    // Is library icon
    if (icon) {
      const [w, h, content, svg, path, , attrs] = icon
      return {
        [`${iconObject.iconName}`]: {
          path: iconObject.prefix.startsWith('fa')
            ? parseFontAwesomeIcon(path)
            : iconObject.prefix.startsWith('fe')
              ? content
              : svg,
          viewBox: `0 0 ${w} ${h}`,
          attrs
        }
      }
    } else {
      return {}
    }
  }

  const result = Object.values(iconSet)
    .map(value => parseIcon(value))
    .reduce((target, source) => merge(target, source), {})

  return result
}

/**
 * @description Parse Icon packs
 * @param {String} pack Icon pack name
 * @param {Object} iconSet Registered Icon set
 * @returns {Object} Parsed pack icons object
 */
export const parsePackIcons = (iconSet) => {
  // TODO: Add support for other icon libraries
  // - Material Icons
  // - Tailwind Icons (Hero icons)
  const packIcons = parseIcons(iconSet)
  return packIcons
}
