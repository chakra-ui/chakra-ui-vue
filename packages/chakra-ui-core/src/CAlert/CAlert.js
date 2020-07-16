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

import { createStyledAttrsMixin } from '../utils'

import CBox from '../CBox'
import CIcon from '../CIcon'
import useAlertStyle, { useAlertIconStyle } from './utils/alert.styles'

export const statuses = {
  info: { icon: 'info', color: 'blue' },
  warning: { icon: 'warning-alt', color: 'orange' },
  success: { icon: 'check-circle', color: 'green' },
  error: { icon: 'warning', color: 'red' }
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
  mixins: [createStyledAttrsMixin('CAlert')],
  provide () {
    return {
      _status: this.status,
      _variant: this.variant
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    componentStyles () {
      return {
        fontFamily: 'body',
        ...useAlertStyle({
          variant: this.variant,
          color: statuses[this.status] && statuses[this.status].color,
          colorMode: this.colorMode,
          theme: this.$chakraTheme()
        })
      }
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
    }
  },
  render (h) {
    return h('div', {
      class: this.className,
      attrs: {
        role: 'alert',
        ...this.computedAttrs
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
  inheritAttrs: false,
  inject: ['_status', '_variant', '$chakraColorMode', '$chakraTheme'],
  props: {
    size: {
      default: 5
    },
    name: String
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    alertIconStyles () {
      return useAlertIconStyle({
        variant: this._variant,
        colorMode: this.colorMode,
        color: statuses[this._status] && statuses[this._status].color
      })
    }
  },
  render (h) {
    return h(CIcon, {
      props: {
        size: this.size,
        name: this.name || (statuses[this._status] && statuses[this._status].icon)
      },
      attrs: {
        focusable: false,
        'data-chakra-component': 'CAlertIcon',
        mr: this.$attrs.mr || 3,
        ...this.alertIconStyles,
        ...this.$attrs
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
  name: 'CAlertTitle',
  functional: true,
  render (h, context) {
    const { attrs } = context.data
    return h(CBox, {
      ...context.data,
      attrs: {
        fontWeight: 'bold',
        lineHeight: 'normal',
        ...attrs,
        'data-chakra-component': 'CAlertTitle'
      }
    }, context.slots().default)
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
  functional: true,
  render (h, context) {
    const { attrs } = context.data
    return h(CBox, {
      ...context.data,
      attrs: {
        ...attrs,
        'data-chakra-component': 'CAlertDescription'
      }
    }, context.slots().default)
  }
}

export {
  CAlert,
  CAlertIcon,
  CAlertTitle,
  CAlertDescription
}
