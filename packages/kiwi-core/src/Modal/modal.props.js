import { StringArray } from '../config/props/props.types'
import { baseProps } from '../config/props'

export default {
  isOpen: Boolean,
  initialFocusRef: [Object, String],
  finalFocusRef: [Object, String],
  contentRef: [Object, String],
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
    type: [Boolean, Object],
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
  container: Object,
  returnFocusOnClose: {
    type: Boolean,
    default: true
  },
  id: String,
  size: {
    type: String,
    default: 'md'
  },
  ...baseProps
}
