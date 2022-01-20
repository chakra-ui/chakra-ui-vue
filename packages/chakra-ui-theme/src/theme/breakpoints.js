/**
 * @description These breakpoint styles were adapted from [@chakra-ui](https://chakra-ui.com/)
 */

const _breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em'
}

export const createBreakpoints = (
  config = {}
) => {
  return { base: '0em', ...config }
}

const breakpoints = createBreakpoints(_breakpoints)

export default breakpoints
