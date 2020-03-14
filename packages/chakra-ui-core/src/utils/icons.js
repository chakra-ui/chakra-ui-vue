import merge from 'lodash-es/merge'

/**
 * @description Parse all Font Awesome Icons
 * @param {Object} iconSet - Registered Icons object
 * @returns {Object} - All Font awesome icons parsed.
 */
const parseFAIcons = (iconSet) => {
  const parseFAIcon = (iconObject) => {
    const { icon } = iconObject
    return {
      [`${iconObject.iconName}`]: {
        path: `<path d="${icon[4]}" fa-key="${3}" fill="currentColor" />`,
        viewBox: `0 0 ${icon[0]} ${icon[1]}`
      }
    }
  }

  const result = Object.values(iconSet)
    .map(value => parseFAIcon(value))
    .reduce((target, source) => merge(target, source), {})

  return result
}

/**
 * @description Parse Icon packs
 * @param {String} pack Icon pack name
 * @param {Object} iconSet Registered Icon set
 * @returns {Object} Parsed pack icons object
 */
export const parsePackIcons = (pack, iconSet) => {
  const packIcons = pack === 'fa' ? parseFAIcons(iconSet) : {}
  return packIcons
}
