import { baseProps } from '../config/props'
import { countToColumns, widthToColumns } from './utils/grid.styles'

import CGrid from '../CGrid'

const CSimpleGrid = {
  name: 'CSimpleGrid',
  props: {
    columns: [String, Number, Array],
    spacingX: [String, Number, Array],
    spacingY: [String, Number, Array],
    spacing: [String, Number, Array],
    minChildWidth: [String, Number, Array],
    ...baseProps
  },
  computed: {
    templateColumns () {
      return this.minChildWidth
        ? widthToColumns(this.minChildWidth)
        : countToColumns(this.columns)
    }
  },
  render (h) {
    return h(CGrid, {
      gap: this.spacing,
      columnGap: this.spacingX,
      rowGap: this.spacingY,
      templateColumns: this.templateColumns
    }, this.$slots.default)
  }
}

export default CSimpleGrid
