import { Box, Icon } from '../../lib/core'
import { baseProps } from '../../lib/config/props'
import { forwardProps } from '../../lib/utils'
import useAlertStyle, { useAlertIconStyle } from './alert.styles'

export const statuses = {
  info: { icon: 'info', color: 'blue' },
  warning: { icon: 'warning-2', color: 'orange' },
  success: { icon: 'check-circle', color: 'green' },
  error: { icon: 'warning', color: 'red' }
}

const Alert = {
  name: 'Alert',
  inject: ['$theme', '$colorMode'],
  provide () {
    return {
      _status: this.status,
      _variant: this.variant
    }
  },
  props: {
    status: {
      type: [String, Array],
      default: 'info'
    },
    variant: {
      type: [String, Array],
      default: 'subtle'
    },
    ...baseProps
  },
  render (h) {
    const alertStyles = useAlertStyle({
      variant: this.variant,
      color: statuses[this.status] && statuses[this.status]['color'],
      colorMode: this.$colorMode,
      theme: this.$theme()
    })

    return h(Box, {
      props: {
        ...alertStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        role: 'alert'
      }
    }, this.$slots.default)
  }
}

const AlertIcon = {
  name: 'AlertIcon',
  inject: ['_status', '_variant', '$colorMode', '$theme'],

  render (h) {
    const alertIconStyles = useAlertIconStyle({
      variant: this._variant,
      colorMode: this.$colorMode,
      color: statuses[this._status] && statuses[this._status]['color']
    })

    return h(Icon, {
      props: {
        mr: 3,
        size: 5,
        name: statuses[this._status] && statuses[this._status]['icon'],
        ...alertIconStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        focusable: false
      }
    })
  }
}

export { Alert, AlertIcon }
