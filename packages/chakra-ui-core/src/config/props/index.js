import baseProps from './props'
import pseudoProps from './pseudo'

export {
  baseProps,
  pseudoProps
}

/**
 * Style props object
 */
const styleProps = {
  ...baseProps,
  ...pseudoProps
}

export default styleProps
