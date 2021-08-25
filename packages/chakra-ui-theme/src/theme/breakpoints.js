/**
 * @description These breakpoint styles were adapted from [@chakra-ui](https://chakra-ui.com/)
 */

const _breakpoints = ['30em', '48em', '62em', '80em']

_breakpoints.sm = _breakpoints[0]
_breakpoints.md = _breakpoints[1]
_breakpoints.lg = _breakpoints[2]
_breakpoints.xl = _breakpoints[3]

export const createBreakpoints = (
  config = {}
) => {
  return { base: '0em', ...config }
}

const breakpoints = createBreakpoints(_breakpoints)

export default breakpoints
