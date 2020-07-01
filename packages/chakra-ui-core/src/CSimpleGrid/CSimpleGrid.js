/**
 * Hey! Welcome to @chakra-ui/vue Simple Grid
 *
 * SimpleGrid provides a friendly interface to create
 * responsive grid layouts with ease.
 *
 * @see Docs     https://vue.chakra-ui.com/simplegrid
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CSimpleGrid/CSimpleGrid.js
 */

import CGrid from '../CGrid'
import { SNA } from '../config/props/props.types'
import { createStyledAttrsMixin } from '../utils'
import { countToColumns, widthToColumns } from './utils/grid.styles'

/**
 * CSimpleGrid component
 *
 * The simple grid component provides basic grid functionalities.
 *
 * @extends CGrid
 * @see Docs https://vue.chakra-ui.com/select
 */
const CSimpleGrid = {
  mixins: [createStyledAttrsMixin('CSimpleGrid')],
  props: {
    columns: SNA,
    spacingX: SNA,
    spacingY: SNA,
    spacing: SNA,
    minChildWidth: SNA
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
      class: this.className,
      props: {
        gap: this.spacing,
        columnGap: this.spacingX,
        rowGap: this.spacingY,
        templateColumns: this.templateColumns
      },
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CSimpleGrid
