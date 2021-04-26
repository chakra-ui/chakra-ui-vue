/**
 * Hey! Welcome to @chakra-ui/vue Image
 *
 * The CImage component is used to display images.
 *
 * CImage composes CBox so you can use all the style props and add responsive styles as well.
 *
 * @see Docs     https://vue.chakra-ui.com/image
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CImage/CImage.js
 */

import CNoSsr from '../CNoSsr'
import { createStyledAttrsMixin } from '../utils'

/**
 * CImage component
 *
 * The CImage component is used to display images.
 *
 * @extends CButton
 * @see Docs https://vue.chakra-ui.com/image
 */
const CImage = {
  name: 'CImage',
  mixins: [createStyledAttrsMixin('CImage')],
  props: {
    src: String,
    srcset: String,
    fallbackSrc: String,
    ignoreFalback: Boolean,
    htmlWidth: String,
    htmlHeight: String,
    size: [String, Number]
  },
  data () {
    return {
      image: undefined,
      hasLoaded: false
    }
  },
  computed: {
    componentStyles () {
      return {
        w: this.size,
        h: this.size
      }
    }
  },
  created () {
    // Should only invoke window.Image in the browser.
    if (process.browser) {
      this.loadImage(this.src, this.srcset)
    }
  },
  methods: {
    loadImage (src, srcset) {
      const image = new window.Image()
      image.srcset = srcset
      image.src = src

      image.onload = (event) => {
        this.hasLoaded = true
        this.$emit('load', event)
      }

      image.onerror = (event) => {
        this.hasLoaded = false
        this.$emit('error', event)
      }
    }
  },
  render (h) {
    let imageProps
    if (this.ignoreFallback) {
      imageProps = { src: this.src }
    } else {
      imageProps = { src: this.hasLoaded ? this.src : this.fallbackSrc }
    }
    return h(CNoSsr, [
      h('img', {
        class: this.className,
        attrs: {
          ...imageProps,
          ...this.computedAttrs,
          width: this.htmlWidth,
          height: this.htmlHeight
        }
      })
    ])
  }
}

export default CImage
