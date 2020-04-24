import { baseProps } from '../config/props'
import CBox from '../CBox'
import CNoSsr from '../CNoSsr'
import { forwardProps } from '../utils'

const CImage = {
  name: 'CImage',
  props: {
    ...baseProps,
    src: String,
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
  created () {
    // Should only invoke window.Image in the browser.
    if (process.browser) {
      this.loadImage(this.src)
    }
  },
  methods: {
    loadImage (src) {
      const image = new window.Image()
      image.src = src

      image.onload = event => {
        this.hasLoaded = true
        this.$emit('load', event)
      }

      image.onError = event => {
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
      h(CBox, {
        props: {
          ...forwardProps(this.$props),
          as: 'img',
          w: this.size,
          h: this.size
        },
        attrs: {
          ...imageProps,
          ...this.$attrs,
          width: this.htmlWidth,
          height: this.htmlHeight
        }
      })
    ])
  }
}

export default CImage
