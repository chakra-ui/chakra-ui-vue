import icons from '@/packages/chakra-ui-core/src/lib/internal-icons'
import theme from '@/packages/chakra-ui-core/src/lib/theme'

const defaultProviders = options => ({
  $chakraTheme: () => theme,
  $chakraColorMode: () => 'light',
  $chakraIcons: icons,
  ...options
})

export default defaultProviders
export { icons, theme }
