const rootOptions = [
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginY',
  'marginX',
  'flex',
  'flexBasis',
  'width',
  'minWidth',
  'maxWidth',
  'maxW',
  'minW',
  'w',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  'position',
  'pos'
]

/**
 * Splits all input[type="select"] props from the root node props
 * @param {Object} props Props object
 * @returns {Array<Object>}
 */
const splitProps = props => {
  const rootProps = {}
  const selectProps = {}
  for (const key in props) {
    if (rootOptions.includes(key)) {
      rootProps[key] = props[key]
    } else {
      selectProps[key] = props[key]
    }
  }
  return [rootProps, selectProps]
}

export default splitProps
