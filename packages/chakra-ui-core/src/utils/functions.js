/**
 * Chains function arguments passed.
 * @param  {...Function} funcs Functions to be chained
 */
export function createChainedFunction (...funcs) {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc
      }

      return function chainedFunction (...args) {
        acc.apply(this, args)
        func.apply(this, args)
      }
    },
    () => {}
  )
}
