import CFlex from '..'
import { render, screen, userEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CFlex },
    template: `<CFlex ${inlineAttrs} data-testid="flex">Flex Me</CFlex>`,
    ...props
  }
  return render(base)
}

describe('CFlex', () => {
  it('should render correctly', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should change styles', () => {
    const inlineAttrs = 'align="center" justify="center" direction="column"'
    const { asFragment } = renderComponent({ inlineAttrs })

    expect(asFragment()).toMatchSnapshot()

    const flex = screen.getByTestId('flex')
    expect(flex).toHaveStyle('display: flex')
    expect(flex).toHaveStyle('align-items: center')
    expect(flex).toHaveStyle('justify-content: center')
    expect(flex).toHaveStyle('flex-direction: column')
  })

  it('should preserve inherited event listeners', async () => {
    const handleClick = jest.fn()
    renderComponent({
      inlineAttrs: '@click="handleClick"',
      methods: {
        handleClick
      }
    })

    await userEvent.click(screen.getByTestId('flex'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should preserve inherited event listeners with custom `as` component', async () => {
    const handleSubmit = jest.fn((event) => {
      expect(event.target).toBe(screen.getByTestId('flex-as-form'))
    })
    renderComponent({
      template: `
        <CFlex as="form" @submit.prevent="handleSubmit" data-testid="flex-as-form">
          <input value="some-value" name="some-key" />
          <button type="submit" value="submit" data-testid="form-submit-btn" />
        </CFlex>
      `,
      methods: {
        handleSubmit
      }
    })

    await userEvent.click(screen.getByTestId('form-submit-btn'))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
