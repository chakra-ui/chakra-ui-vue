/**
 * Hey! Welcome to @chakra-ui/vue Alert
 *
 * Alerts are used to communicate a state
 * that affects a system, feature or page
 *
 * An alert is an element that displays a brief,
 * important message in a way that attracts the user's
 * attention without interrupting the user's task.
 *
 * @see Docs     https://vue.chakra-ui.com/alert
 * @see Source   link to source
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CAlert/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#alert
 */

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

/**
 * CAlert component
 *
 * The wrapper for alert components.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/alert
 */
const CAlert = {
  name: 'CAlert',
  inject: ['$chakraTheme', '$chakraColorMode'],
  provide () {
    return {
      _status: this.status,
      _variant: this.variant
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
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
      theme: this.$chakraTheme()
    })

    return h(CBox, {
      props: {
        fontFamily: 'body',
        ...alertStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        role: 'alert',
        'data-chakra-component': 'CAlert'
      }
    }, this.$slots.default)
  }
}

/**
 * CAlertIcon component
 *
 * The visual icon for the alert that changes
 * based on the `status` prop
 *
 * @extends CIcon
 * @see Docs https://vue.chakra-ui.com/alert
 */
const CAlertIcon = {
  name: 'CAlertIcon',
  inject: ['_status', '_variant', '$chakraColorMode', '$chakraTheme'],
  props: {
    size: {
      default: 5
    },
    name: String,
    ...baseProps
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
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
        focusable: false,
        'data-chakra-component': 'CAlertIcon'
      }
    })
  }
}

/**
 * CAlertTitle component
 *
 * The title of the alert to be announced
 * by screen readers.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/alert
 */
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
      },
      attrs: {
        'data-chakra-component': 'CAlertTitle'
      }
    }, this.$slots.default)
  }
}

/**
 * CAlertDescription component
 *
 * The description of the alert to be announced
 * by screen readers.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/alert
 */
const CAlertDescription = {
  name: 'CAlertDescription',
  props: {
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        ...forwardProps(this.$props),
        chakraId: 'CAlertDescription'
      },
      attrs: {
        'data-chakra-component': 'CAlertDescription'
      }
    }, this.$slots.default)
  }
}

export {
  CAlert,
  CAlertIcon,
  CAlertTitle,
  CAlertDescription
}
