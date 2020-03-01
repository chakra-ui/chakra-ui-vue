import Button from '@/packages/kiwi-core/src/Button'
import ButtonGroup from '@/packages/kiwi-core/src/ButtonGroup'
import { render, defaultProviders } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const baseButton = {
    components: {
      Button,
      ButtonGroup
    },
    provide: () => defaultProviders(),
    template: `
    <ButtonGroup>
      <Button>Button1</Button>
      <Button>Button2</Button>
    </ButtonGroup>`,
    ...props
  }
  return render(baseButton)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  const { getByText } = renderComponent()
  expect(getByText('Button1')).toBeInTheDocument()
  expect(getByText('Button2')).toBeInTheDocument()
})
