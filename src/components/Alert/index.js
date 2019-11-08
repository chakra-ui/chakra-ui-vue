import { Box, Icon } from '../../lib/core'
import { baseProps } from '../../lib/config/props'
import { forwardProps } from '../../lib/utils'
import useAlertStyle, { useAlertIconStyle } from './alert.styles'

export const statuses = {
  info: { icon: '_info', color: 'blue' },
  warning: { icon: '_warning-2', color: 'orange' },
  success: { icon: '_check-circle', color: 'green' },
  error: { icon: '_warning', color: 'red' }
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

    console.log({ alertStyles })

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
  props: {
    size: {
      default: 5
    },
    ...baseProps
  },

  render (h) {
    const alertIconStyles = useAlertIconStyle({
      variant: this._variant,
      colorMode: this.$colorMode,
      color: statuses[this._status] && statuses[this._status]['color']
    })

    return h(Icon, {
      props: {
        mr: this.$props.mr || 3,
        size: this.size,
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

const AlertTitle = {
  name: 'AlertTitle',
  props: {
    ...baseProps
  },
  render (h) {
    return h(Box, {
      props: {
        fontWeight: 'bold',
        lineHeight: 'normal',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const AlertDescription = {
  name: 'AlertDescription',
  props: {
    ...baseProps
  },
  render (h) {
    return h(Box, { props: forwardProps(this.$props) }, this.$slots.default)
  }
}

export { Alert, AlertIcon, AlertTitle, AlertDescription }
