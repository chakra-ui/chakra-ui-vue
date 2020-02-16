import { StringArray } from '../config/props/props.types'
import { baseProps } from '../config'

const InputGroup = {
  name: 'InputGroup',
  inject: ['$theme'],
  props: {
    ...baseProps,
    size: {
      type: StringArray,
      default: 'md'
    }
  },
  computed: {
    theme () {
      return this.$theme()
    }
  }
}

export default InputGroup
