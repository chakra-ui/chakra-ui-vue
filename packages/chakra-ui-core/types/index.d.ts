import Chakra, { Icon } from "./chakra"
import { Theme } from "../../chakra-ui-theme/types"
import useToast from "../src/CToast"
import { ToastFactory } from '../src/CToast/CToast'

type ChakraIcons = { [name: string]: Icon };

declare module 'vue/types/vue' {
  export interface Vue {
    $toast: ToastFactory
    $chakra: {
      theme: Theme
      icons: ChakraIcons
    }
  }
}

declare module '../src/CColorModeProvider' {
  export interface Provides {
    $chakraColorMode: () => 'light' | 'dark'
    $toggleColorMode: () => void
  }
}

declare module '../src/CThemeProvider' {
  export interface Provides {
    $chakraTheme: Theme
    $chakraIcons: ChakraIcons
    $chakraColorMode: () => 'light'
  }
}

export { Provides as CColorModeProvides } from '../src/CColorModeProvider'
export { Provides as CThemeProvides } from '../src/CThemeProvider'

export const useToast: typeof useToast
export const defaultTheme: Theme
export * from './component'
export { ChakraPlugin, Options } from './chakra'
export default Chakra
