import Box from '../Box'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

const Grid = {
  name: 'Grid',
  props: {
    gap: {
      type: [String, Number, Array]
    },
    rowGap: {
      type: [String, Number, Array]
    },
    columnGap: {
      type: [String, Number, Array]
    },
    autoFlow: {
      type: [String, Number, Array]
    },
    autoRows: {
      type: [String, Number, Array]
    },
    autoColumns: {
      type: [String, Number, Array]
    },
    templateRows: {
      type: [String, Number, Array]
    },
    templateColumns: {
      type: [String, Number, Array]
    },
    templateAreas: {
      type: [String, Number, Array]
    },
    area: {
      type: [String, Number, Array]
    },
    column: {
      type: [String, Number, Array]
    },
    row: {
      type: [String, Number, Array]
    },
    ...baseProps
  },
  render (h) {
    return h(Box, {
      props: {
        d: 'grid',
        gridArea: this.area,
        gridTemplateAreas: this.templateAreas,
        gridGap: this.gap,
        gridRowGap: this.rowGap,
        gridColumnGap: this.columnGap,
        gridAutoColumns: this.autoColumns,
        gridColumn: this.column,
        gridRow: this.row,
        gridAutoFlow: this.autoFlow,
        gridAutoRows: this.autoRows,
        gridTemplateRows: this.templateRows,
        gridTemplateColumns: this.templateColumns,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

export default Grid
