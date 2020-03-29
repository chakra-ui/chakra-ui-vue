import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import { SNA } from '../config/props/props.types'

import CBox from '../CBox'

const CGrid = {
  name: 'CGrid',
  props: {
    gap: SNA,
    rowGap: SNA,
    columnGap: SNA,
    autoFlow: SNA,
    autoRows: SNA,
    autoColumns: SNA,
    templateRows: SNA,
    templateColumns: SNA,
    templateAreas: SNA,
    area: SNA,
    column: SNA,
    row: SNA,
    ...baseProps
  },
  render (h) {
    return h(CBox, {
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

export default CGrid
