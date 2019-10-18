import colors from './colors'
import typography from './typography'
import borders from './borders'
import opacity from './opacity'
import radii from './radii'
import shadows from './shadows'
import sizes, { baseSizes } from './sizes'
import zIndices from './z-indices'

const space = baseSizes

const theme = {
  colors,
  borders,
  opacity,
  radii,
  shadows,
  sizes,
  space,
  zIndices,
  ...typography
}

export default theme
