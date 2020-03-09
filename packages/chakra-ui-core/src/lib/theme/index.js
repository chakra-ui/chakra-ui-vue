import colors from './colors'
import typography from './typography'
import borders, { borderWidths } from './borders'
import opacity from './opacity'
import radii from './radii'
import shadows from './shadows'
import sizes, { baseSizes } from './sizes'
import zIndices from './z-indices'

const space = baseSizes

const theme = {
  colors,
  borders,
  borderWidths,
  opacity,
  radii,
  shadows,
  space,
  sizes,
  zIndices,
  ...typography
}

export default theme
