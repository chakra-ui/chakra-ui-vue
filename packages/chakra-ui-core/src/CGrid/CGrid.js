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

import { createStyledAttrsMixin } from '../utils'
import { SNA } from '../config/props/props.types'

/**
 * CGrid component
 *
 * A primitive component useful for grid layouts.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/grid
 */
const CGrid = {
  mixins: [createStyledAttrsMixin('CGrid')],
  props: {
    as: {
      type: String,
      default: 'div'
    },
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
    row: SNA
  },
  computed: {
    componentStyles () {
      return {
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
        gridTemplateColumns: this.templateColumns
      }
    }
  },
  render (h) {
    return h(this.as, {
      class: this.className,
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CGrid
