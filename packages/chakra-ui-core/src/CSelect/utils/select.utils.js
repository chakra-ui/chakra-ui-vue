import { camelize } from '../../utils'

const rootOptions = {
  m: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true,
  mx: true,
  my: true,
  margin: true,
  marginTop: true,
  marginBottom: true,
  marginLeft: true,
  marginRight: true,
  marginY: true,
  marginX: true,
  flex: true,
  flexBasis: true,
  width: true,
  minWidth: true,
  maxWidth: true,
  maxW: true,
  minW: true,
  w: true,
  zIndex: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
  position: true,
  pos: true
}

/**
 * Splits all input[type="select"] props from the root node props
 * @param {Object} props Props object
 * @returns {Array<Object>}
 */
const splitProps = (props) => {
  const rootProps = {}
  const selectProps = {}
  for (const key in props) {
    const _key = camelize(key)
    if (rootOptions[_key]) {
      rootProps[_key] = props[key]
    } else {
      selectProps[_key] = props[key]
    }
  }
  return [rootProps, selectProps]
}

export default splitProps
