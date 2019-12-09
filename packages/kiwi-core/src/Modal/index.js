// import Box from '../Box'
import { baseProps } from '../config/props'
import { StringArray } from '../config/props/props.types'
// import { forwardProps, cloneVNode } from '../utils'
// import modalProps from './modal.props'

const Modal = {
  name: 'Modal',
  props: {
    isOpen: Boolean,
    initialFocusRef: [HTMLElement, Object],
    finalFocusRef: [HTMLElement, Object],
    onClose: Function,
    blockScrollOnMount: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true
    },
    useInert: {
      type: Boolean,
      default: true
    },
    scrollBehavior: {
      type: StringArray,
      default: 'outside'
    },
    isCentered: Boolean,
    addAriaLabels: {
      type: Boolean,
      default: true
    },
    preserveScrollBarGap: Boolean,
    formatIds: {
      type: Function,
      default: id => ({
        content: `modal-${id}`,
        header: `modal-${id}-header`,
        body: `modal-${id}-body`
      })
    },
    container: [HTMLElement, Object],
    returnFocusOnClose: {
      type: Boolean,
      default: true
    },
    id: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    ...baseProps
  }
}

// Modal Exports
export {
  Modal
}
