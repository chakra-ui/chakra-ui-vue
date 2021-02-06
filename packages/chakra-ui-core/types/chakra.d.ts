import { PluginObject } from "vue"

export type Theme = {
  breakpoints: any
  zIndices: any
  radii: any
  opacity: any
  borders: any
  colors: any
  borderWidths: any
  sizes: any
  shadows: any
  space: any
  fontSizes: any
  fonts: any
  fontWeights: any
  lineHeights: any
  letterSpacings: any
}

export type Options = {
  theme: Theme
  extendTheme: Theme
  icons: {
      extend: any
      iconPack: string
      iconSet: any
  }
}

export type Chakra = PluginObject<Options>

declare let chakra: Chakra
export default chakra