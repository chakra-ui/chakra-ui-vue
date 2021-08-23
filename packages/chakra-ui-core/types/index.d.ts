import Chakra, { Icon } from "./chakra"
import { Theme } from "../../chakra-ui-theme/types"
import useToast from "../src/CToast"
import { ToastFactory } from '../src/CToast/CToast'

declare module 'vue/types/vue' {
  export interface Vue {
    $toast: ToastFactory
    $chakra: {
      theme: Theme
      icons: { [name: string]: Icon }
    }
    chakraColorMode: string
    chakraToggleColorMode: string
  }
}

export const useToast: typeof useToast
export const defaultTheme: Theme
export * from './component'
export { ChakraPlugin, Options } from './chakra'
export default Chakra
