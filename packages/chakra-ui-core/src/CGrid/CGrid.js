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
import { SNA, StringArray } from '../config/props/props.types'

/**
 * @description Map "span" values to accommodate breakpoint values
 * @param {Array} value
 * @returns {(String|Array)} String or Array of breakpoint values
 */
const spanFn = (value) => {
  if (Array.isArray(value)) {
    return value.map(v =>
      v === 'auto' ? 'auto' : `span ${v}/span ${v}`
    )
  } else {
    return value === 'auto' ? 'auto' : `span ${value}/span ${value}`
  }
}

/**
 * CGridItem component
 *
 * A primitive component useful for grid layouts.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/grid
 */

const CGridItem = {
  name: 'CGridItem',
  mixins: [createStyledAttrsMixin('CGridItem')],
  props: {
    colSpan: { type: StringArray },
    rowSpan: { type: StringArray },
    colStart: { type: StringArray },
    colEnd: { type: StringArray },
    rowStart: { type: StringArray },
    rowEnd: { type: StringArray }
  },
  computed: {
    componentStyles () {
      return {
        gridColumn: this.colSpan ? spanFn(this.colSpan) : null,
        gridRow: this.rowSpan ? spanFn(this.rowSpan) : null,
        gridColumnStart: this.colStart,
        gridColumnEnd: this.colEnd,
        gridRowStart: this.rowStart,
        gridRowEnd: this.rowEnd
      }
    }
  },
  render (h) {
    return h('div',
      {
        class: this.className,
        attrs: this.computedAttrs
      },
      this.$slots.default
    )
  }
}

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
    return h(
      this.as,
      {
        class: this.className,
        attrs: this.computedAttrs
      },
      this.$slots.default
    )
  }
}

export {
  CGrid,
  CGridItem
}
