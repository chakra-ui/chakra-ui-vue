import { CBox, CFlex, CGrid, boxProps } from '@chakra-ui/vue'

export const ColorPalette = {
  props: {
    ...boxProps,
    color: String,
    name: String
  },
  inject: ['$chakraTheme'],
  computed: {
    theme () {
      return this.$chakraTheme()
    },
    colorCode () {
      let colorCode = this.color
      const [shade, hue] = this.color.split('.')

      if (shade && hue) {
        colorCode = this.theme.colors[shade][hue]
      }

      if (this.color in this.theme.colors && typeof this.theme.colors[this.color] === 'string') {
        colorCode = this.theme.colors[this.color]
      }

      return colorCode
    }
  },
  render (h) {
    return (
      <CFlex align="center" {...this.$props}>
        <CBox rounded="md" w="3rem" h="3rem" boxShadow="inner" mr={3} bg={this.color} />
        <CBox fontSize="sm">
          <CBox fontWeight="semibold" textTransform="capitalize">
            {this.name}
          </CBox>
          <CBox textTransform="uppercase">{this.colorCode}</CBox>
        </CBox>
      </CFlex>
    )
  }
}

export const ColorPalettes = {
  name: 'ColorPalettes',
  inject: ['$chakraTheme'],
  props: {
    color: String
  },
  computed: {
    theme () {
      return this.$chakraTheme()
    }
  },
  render (h) {
    const keys = Object.keys(this.theme.colors[this.color])
    return (
      <CGrid
        mt={7}
        gap={6}
        templateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
        {...this.$attrs}
      >
        {keys.map(item => (
          <ColorPalette color={`${this.color}.${item}`} name={`${this.color} ${item}`} />
        ))}
      </CGrid>
    )
  }
}

export const ColorWrapper = {
  render (h) {
    return (
      <CGrid
        mt={7}
        gap={6}
        templateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
        {...this.$attrs}
      >
        {this.$slots.default}
      </CGrid>
    )
  }
}
