import CFlex from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CFlex },
    template: `<CFlex ${inlineAttrs} data-testid="flex">Flex Me</CFlex>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change styles', () => {
  const inlineAttrs = 'align="center" justify="center" direction="column"'
  const { asFragment, getByTestId } = renderComponent({ inlineAttrs })

  expect(asFragment()).toMatchSnapshot()

  const flex = getByTestId('flex')
  expect(flex).toHaveStyle('display: flex')
  expect(flex).toHaveStyle('align-items: center')
  expect(flex).toHaveStyle('justify-content: center')
  expect(flex).toHaveStyle('flex-direction: column')
})
