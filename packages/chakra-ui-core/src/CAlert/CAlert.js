import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import useAlertStyle, { useAlertIconStyle } from './utils/alert.styles'

import CBox from '../CBox'
import CIcon from '../CIcon'

export const statuses = {
  info: { icon: '_info', color: 'blue' },
  warning: { icon: '_warning-2', color: 'orange' },
  success: { icon: '_check-circle', color: 'green' },
  error: { icon: '_warning', color: 'red' }
}

const CAlert = {
  name: 'CAlert',
  inject: ['$theme', '$colorMode'],
  provide () {
    return {
      _status: this.status,
      _variant: this.variant
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
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
      colorMode: this.colorMode,
      theme: this.$theme()
    })

    return h(CBox, {
      props: {
        fontFamily: 'body',
        ...alertStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        role: 'alert'
      }
    }, this.$slots.default)
  }
}

const CAlertIcon = {
  name: 'CAlertIcon',
  inject: ['_status', '_variant', '$colorMode', '$theme'],
  props: {
    size: {
      default: 5
    },
    name: String,
    ...baseProps
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    }
  },
  render (h) {
    const alertIconStyles = useAlertIconStyle({
      variant: this._variant,
      colorMode: this.colorMode,
      color: statuses[this._status] && statuses[this._status]['color']
    })

    return h(CIcon, {
      props: {
        mr: this.$props.mr || 3,
        size: this.size,
        name: this.name || (statuses[this._status] && statuses[this._status]['icon']),
        ...alertIconStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        focusable: false
      }
    })
  }
}

const CAlertTitle = {
  name: 'AlertTitle',
  props: {
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        fontWeight: 'bold',
        lineHeight: 'normal',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const CAlertDescription = {
  name: 'CAlertDescription',
  props: {
    ...baseProps
  },
  render (h) {
    return h(CBox, { props: forwardProps(this.$props) }, this.$slots.default)
  }
}

export { CAlert, CAlertIcon, CAlertTitle, CAlertDescription }
