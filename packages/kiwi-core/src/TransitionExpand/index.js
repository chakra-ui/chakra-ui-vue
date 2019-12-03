/**
 * @description The following script was adapted from Markus Oberlener's blog on transitioning height based on `v-show` and  `v-if` directives.
 * @see https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
 */
export default {
  name: 'TransitionExpand',
  functional: true,
  mounted () {
    const css = `
    * {
      will-change: height;
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    .expand-enter-active,
    .expand-leave-active {
      transition: height 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
      overflow: hidden;
    }
    .expand-enter,
    .expand-leave-to {
      height: 0;
    }
    `

    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style')

    head.appendChild(style)

    style.type = 'text/css'
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }
  },
  render (h, context) {
    const data = {
      props: {
        name: `expand`
      },
      on: {
        // After enter event
        afterEnter (element) {
          // eslint-disable-next-line no-param-reassign
          element.style.height = `auto`
        },
        enter (element) {
          const { width } = getComputedStyle(element)
          /* eslint-disable no-param-reassign */
          element.style.width = width
          element.style.position = `absolute`
          element.style.visibility = `hidden`
          element.style.height = `auto`
          /* eslint-enable */
          const { height } = getComputedStyle(element)
          /* eslint-disable no-param-reassign */
          element.style.width = null
          element.style.position = null
          element.style.visibility = null
          element.style.height = 0
          /* eslint-enable */

          // eslint-disable-next-line no-unused-expressions
          getComputedStyle(element).height
          setTimeout(() => {
            // eslint-disable-next-line no-param-reassign
            element.style.height = height
          })
        },
        leave (element) {
          const { height } = getComputedStyle(element)
          // eslint-disable-next-line no-param-reassign
          element.style.height = height

          // eslint-disable-next-line no-unused-expressions
          getComputedStyle(element).height
          setTimeout(() => {
            // eslint-disable-next-line no-param-reassign
            element.style.height = 0
          })
        }
      }
    }
    return h('transition', data, context.children)
  }
}
