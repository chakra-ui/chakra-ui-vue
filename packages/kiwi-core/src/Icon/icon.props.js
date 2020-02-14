export const iconProps = {
  name: {
    type: [String, Array]
  },
  use: {
    type: [String, Array],
    required: false
  },
  pack: {
    type: String,
    required: false,
    default: 'fas',
    validator: value => value.match(/^(fas|fal|fad)$/)
  },
  size: {
    type: [String, Number, Array],
    default: '1em'
  },
  color: {
    type: [String, Array],
    default: 'currentColor'
  }
}
