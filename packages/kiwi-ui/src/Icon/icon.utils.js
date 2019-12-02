// @ts-check

/**
 * @description Evaluate icon size props
 * @param {Object} props - Props object
 * @property {String} size - Props object
 * @property {Object} theme - Props object
 * @returns {Object} Size style props object
 */
const sizeProps = ({ size, theme }) => {
  const _theme = theme()
  return {
    w: _theme.sizes[size],
    h: _theme.sizes[size]
  }
}

/**
 * @description Evaluate icon style props
 * @param {Object} props - Props object
 */
export const iconStyles = (props) => {
  return {
    ...sizeProps(props)
  }
}
