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

/**
 * Computes a value if it's a function. Otherwise it returns the value
 * @param {Function|Any} value value to be computed
 * @param {Object|Any} props values to be passed as argument to function
 * @example
 *
 * const fn = (a, b) => a + b
 * const result = runIfFn(fn, 2,3)
 * console.log(result) // 5
 *
 * const obj = { m:3, p: 4 }
 * const withObj = runIfFn(obj, {m: 3})
 * console.log(withObj) // { m:3, p: 4 }
 */
export const runIfFn = (value, ...props) => {
  if (typeof value === 'function') {
    return value(...props)
  }
  return value
}
