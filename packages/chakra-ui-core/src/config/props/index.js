import baseProps from './props'
import pseudoProps from './pseudo'

export { default as propsConfig } from './props.config'
export * from './props.config'

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
