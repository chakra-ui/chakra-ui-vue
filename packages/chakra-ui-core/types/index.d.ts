import Chakra, { Icon } from "./chakra"
import { Theme } from "../../chakra-ui-theme/types"
import useToast from "../src/CToast"

declare module 'vue/types/vue' {
  interface Vue {
    $toast: ReturnType<typeof useToast>
    $chakra: {
      theme: Theme
      icons: { [name: string]: Icon }
    }
  }
}

export * from './component'
export default Chakra
