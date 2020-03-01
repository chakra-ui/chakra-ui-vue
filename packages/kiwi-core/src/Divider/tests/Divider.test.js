import Divider from '../'
import { render } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { Divider },
    template: `<Divider ${inlineAttrs} />`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change orientation', () => {
  const inlineAttrs = 'orientation="vertical"'
  const { asFragment } = renderComponent({ inlineAttrs })

  expect(asFragment()).toMatchSnapshot()
})
