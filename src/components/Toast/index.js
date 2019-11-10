/**
 * The meat and potatoes of this component is to expose an API `useToast()` that will allow users to provide notification data.
 *
 * It will accept:
 *  - status
 *  - position
 *  - title
 *  - description
 *  - duration
 *  - isClosable
 *  - render() option. <-- Render should mimic Vue's render function
 *
 * Example usage:
 * ```js
 * import { useToast } from 'kiwi-ui'
 *
 * const toast = useToast();
 *
 * const showSuccess = (props) => {
 *  return toast.notify({
 *    ...props,
 *    render(h) {
 *      return h(Box, {
 *        props: {
 *          m: 3,
 *          color: 'white',
 *          p: 3,
 *          bg: 'blue.200'
 *        }
 *      }, 'Hello World!')
 *    }
 *  })
 * }
 *
 *
 * ```
 *
 */
