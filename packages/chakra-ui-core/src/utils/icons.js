import { merge } from 'lodash-es'

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
            ? `<path d="${path}" fill="currentColor" />`
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
