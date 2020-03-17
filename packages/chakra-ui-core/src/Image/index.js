import { baseProps } from '../config/props'
import Box from '../Box'
import NoSsr from '../NoSsr'
import { forwardProps } from '../utils'

const Image = {
  name: 'CImage',
  props: {
    ...baseProps,
    src: String,
    fallbackSrc: String,
    ignoreFalback: Boolean,
    htmlWidth: String,
    htmlHeight: String
  },
  data () {
    return {
      image: undefined,
      hasLoaded: false
    }
  },
  created () {
    if (process.browser) {
      console.log('isBrowser', process.browser)
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
    return h(NoSsr, [
      h(Box, {
        props: {
          ...forwardProps(this.$props),
          as: 'img'
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

export default Image
