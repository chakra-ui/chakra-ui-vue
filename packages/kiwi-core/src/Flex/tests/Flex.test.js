import Flex from '../'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { Flex },
    template: `<Flex ${inlineAttrs}>Flex Me</Flex>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change orientation', () => {
  const inlineAttrs = 'align="center"'
  const { asFragment } = renderComponent({ inlineAttrs })

  expect(asFragment()).toMatchSnapshot()
})
