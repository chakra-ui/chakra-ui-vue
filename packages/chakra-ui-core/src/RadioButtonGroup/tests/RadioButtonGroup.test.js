import { Button, Radio, RadioGroup, RadioButtonGroup } from '../../'
import { render, defaultProviders } from '@/tests/test-utils'

// mocks
jest.mock('breadstick/dist/components/Alert/styles.css', () => ({})) // jest tries to import styles and fails...

const CustomRadio = {
  name: 'CustomRadio',
  props: {
    isChecked: Boolean,
    isDisabled: Boolean,
    value: [String, Number],
    mx: String,
    dataTestid: String
  },
  inheritAttrs: true,
  render (h) {
    return h(Button, {
      props: {
        ...this.$props,
        isDisabled: this.isDisabled,
        variantColor: this.isChecked ? 'red' : 'gray'
      },
      attrs: {
        role: 'radio',
        'aria-checked': this.isChecked,
        'data-testid': this.dataTestid
      }
    }, this.$slots.default)
  }
}

const renderComponent = (props) => {
  const base = {
    components: { Button, Radio, RadioGroup, RadioButtonGroup, CustomRadio },
    provide: () => defaultProviders(),
    template: `
    <RadioButtonGroup defaultValue="item-2" isInline>
        <CustomRadio value="item-1" data-testid="item-1">Custom Radio 1</CustomRadio>
        <CustomRadio value="item-2" data-testid="item-2">Custom Radio 2</CustomRadio>
        <CustomRadio value="item-3" data-testid="item-3">Custom Radio 3</CustomRadio>
        <CustomRadio isDisabled value="item-4" data-testid="item-4">Custom Radio 4</CustomRadio>
    </RadioButtonGroup>
`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  const { getByText } = renderComponent()
  expect(getByText('Custom Radio 1')).toBeInTheDocument()
  expect(getByText('Custom Radio 2')).toBeInTheDocument()
})

test('defaultValue works', () => {
  const { getByTestId } = renderComponent()
  const one = getByTestId('item-1')
  const two = getByTestId('item-2')

  expect(one).not.toHaveAttribute('aria-checked')
  expect(two).toHaveAttribute('aria-checked', 'true')
})

test('CustomRadio isDisabled works', () => {
  const { getByTestId } = renderComponent()
  const last = getByTestId('item-4')

  expect(last).toHaveAttribute('disabled')
})
