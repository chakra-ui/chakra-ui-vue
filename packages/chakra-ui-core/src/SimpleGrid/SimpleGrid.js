import Grid from '../Grid'
import { countToColumns, widthToColumns } from './grid.styles'

const SimpleGrid = {
  name: 'SimpleGrid',
  extends: Grid,
  props: {
    columns: [String, Number, Array],
    spacingX: [String, Number, Array],
    spacingY: [String, Number, Array],
    spacing: [String, Number, Array],
    minChildWidth: [String, Number, Array]
  },
  computed: {
    templateColumns () {
      return this.minChildWidth
        ? widthToColumns(this.minChildWidth)
        : countToColumns(this.columns)
    }
  },
  render (h) {
    return h(Grid, {
      gap: this.spacing,
      columnGap: this.spacingX,
      rowGap: this.spacingY,
      templateColumns: this.templateColumns
    }, this.$slots.default)
  }
}

export default SimpleGrid
