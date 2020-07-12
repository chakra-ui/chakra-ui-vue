import CText from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CText },
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
  const inlineAttrs = 'd="flex"'
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
  ({ as }) => {
    const inlineAttrs = `as=${as}`
    const { getByTestId } = renderComponent({ inlineAttrs })
    const text = getByTestId('text')
    expect(text.tagName.toLowerCase()).toEqual(as)
  }
)
