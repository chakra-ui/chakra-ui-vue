import FormControl from '../'
import { render } from '@/packages/kiwi-core/src/test-utils'
import FormLabel from '@/packages/kiwi-core/src/FormLabel'
import Input from '@/packages/kiwi-core/src/Input'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { FormControl, FormLabel, Input },
    template: `
    <FormControl ${inlineAttrs}>
      <FormLabel for="fname">First name</FormLabel>
      <Input id="fname" placeholder="First name" />
    </FormControl>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
