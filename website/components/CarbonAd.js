import { Css } from '@chakra-ui/vue'
import { css } from '@emotion/css'
import { loadScript } from '~/utils'

const CarbonAd = {
  name: 'CarbonAd',
  inject: ['$chakraTheme', '$chakraColorMode'],
  computed: {
    colorMode: vm => vm.$chakraColorMode(),
    theme: vm => vm.$chakraTheme(),
    className () {
      const _css = styles => css(Css(styles)(this.theme))

      return _css({
        display: 'block',
        position: 'relative',
        margin: '32px 0',
        maxWidth: '480px',
        minHeight: '132px',
        borderRadius: '4px',
        bg: this.colorMode === 'light' ? 'gray.50' : 'rgba(36, 70, 93, 0.32)',
        color: 'inherit',
        '@media (max-width: 480px)': {
          fontSize: '0.875em'
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            textDecoration: 'underline'
          }
        },
        '.carbon-wrap': {
          display: 'flex',
          padding: '16px'
        },
        '.carbon-img': {
          marginRight: '16px',
          img: {
            display: 'block'
          }
        },
        '.carbon-text': {
          fontSize: '0.8rem',
          lineHeight: 1.4
        },
        '.carbon-poweredby': {
          position: 'absolute',
          bottom: '16px',
          left: '162px',
          color: `${this.theme?.colors.gray[500]} !important`,
          display: 'block',
          fontSize: '10px',
          fontWeight: 'semibold',
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: '0.2px'
        }
      })
    },
    css: vm => styles => Css(styles)(vm.theme)
  },
  async mounted () {
    await this.$nextTick()
    const { carbonContainer } = this.$refs
    if (!carbonContainer) return

    const script = loadScript(
      '//cdn.carbonads.com/carbon.js?serve=CEBI5K7I&placement=vuechakra-uicom',
      carbonContainer
    )

    script.id = '_carbonads_js'
    script.type = 'text/javascript'
  },
  render (h) {
    return h('span', {
      class: this.className,
      ref: 'carbonContainer'
    })
  }
}

export default CarbonAd
