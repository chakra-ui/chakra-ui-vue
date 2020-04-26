/**
 * Hey! Welcome to @chakra-ui/vue Grid
 *
 * A primitive useful for grid layouts. CGrid is CBox with
 * display: grid and comes with helpful style shorthand.
 * It renders a div element by default
 *
 * @see Docs     https://vue.chakra-ui.com/grid
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CGrid/CGrid.js
 */

import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import { SNA } from '../config/props/props.types'

import CBox from '../CBox'

/**
 * CGrid component
 *
 * A primitive component useful for grid layouts.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/grid
 */
const CGrid = {
  name: 'CGrid',
  props: {
    ...baseProps,
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
    as: String
  },
  render (h) {
    return h(CBox, {
      props: {
        as: this.as,
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
      },
      attrs: {
        'data-chakra-component': 'CGrid'
      }
    }, this.$slots.default)
  }
}

export default CGrid
