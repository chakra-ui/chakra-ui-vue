import { PluginObject } from "vue"
import { IconPack } from "@fortawesome/fontawesome-common-types"
import { Theme } from "../../chakra-ui-theme/types"

export type Icon = {
  path: string
  viewBox?: string
  attrs?: any
}

export type Options = {
  extendTheme: Theme
  icons: {
    extend: { [name: string]: Icon }
    iconPack: string
    iconSet: IconPack
  }
}

export type ChakraPlugin = PluginObject<Options>

declare let chakra: ChakraPlugin
export default chakra
