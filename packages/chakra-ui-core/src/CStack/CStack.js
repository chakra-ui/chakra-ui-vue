import { css } from 'emotion'

import CFlex from '../CFlex'
import { createStyledAttrsMixin } from '../utils'

const CStack = {
  name: 'CStack',
  mixins: [createStyledAttrsMixin('CStack')],
  props: {
    ...CFlex.props,
    isInline: [Boolean, String, Array],
    isReversed: [Boolean, String, Array],
    direction: [Boolean, String, Array]
  },
  computed: {
    _isInline () {
      return this.isInline || (this.direction && this.direction.startsWith('row'))
    },
    _isReversed () {
      return this.isReversed || (this.direction && this.direction.endsWith('reverse'))
    },
    _direction () {
      let _direction

      if (this._isInline) {
        _direction = 'row'
      }

      if (this._isReversed) {
        _direction = this.isInline ? 'row-reverse' : 'column-reverse'
      }

      if (this.direction) {
        _direction = this.direction
      }

      if (!this._isInline && !this._isReversed && !this.direction) {
        _direction = 'column'
      }

      return _direction
    },
    spacingProps () {
      return this._isInline
        ? this._isReversed
          ? { mr: this.spacing, mb: 0 }
          : { ml: this.spacing, mt: 0 }
        : this._isReversed
          ? { mb: this.spacing, mr: 0 }
          : { mt: this.spacing, ml: 0 }
    }
  },
  render (h) {
    return h(CFlex, {
      class: [this.className, css({
        '& > *:not(template) ~ *:not(template)': this.$chakraSystem(this.spacingProps)
      })],
      props: {
        ...this.$props,
        direction: this._direction
      },
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CStack
