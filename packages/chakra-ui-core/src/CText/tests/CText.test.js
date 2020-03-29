import CText from '..'
import { render, defaultProviders } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CText },
    provide: () => defaultProviders(),
    template: `<CText data-testid="text" ${inlineAttrs}>Text Works</CText>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change the style', () => {
  const inlineAttrs = `d="flex"`
  const { asFragment, getByTestId } = renderComponent({ inlineAttrs })

  const text = getByTestId('text')

  expect(asFragment()).toMatchSnapshot()
  expect(text).toHaveStyle('display: flex')
})

it.each`
  as
  ${'u'}
  ${'abbr'}
  ${'cite'}
  ${'del'}
  ${'em'}
  ${'ins'}
  ${'kbd'}
  ${'mark'}
  ${'s'}
  ${'sub'}
  ${'sup'}}
`(
  'should display text type as $as',
  async ({ as }) => {
    const inlineAttrs = `as=${as}`
    const { asFragment } = renderComponent({ inlineAttrs })

    expect(asFragment()).toMatchSnapshot()
  }
)
