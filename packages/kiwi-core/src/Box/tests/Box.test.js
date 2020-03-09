import Box from '../'
import { render, defaultProviders } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { Box },
    provide: () => defaultProviders(),
    template: `<Box data-testid="box" ${inlineAttrs}>Box Works</Box>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change the style', () => {
  const inlineAttrs = `
  d="flex" :w="['auto']" px="5" py="5" shadow="lg"
  my="5" mb="5" rounded="sm" font-family="body"
  background-color="blue.200" color="blue.700"`
  const { asFragment, getByTestId } = renderComponent({ inlineAttrs })

  const box = getByTestId('box')

  expect(asFragment()).toMatchSnapshot()
  expect(box).toHaveStyle('display: flex')
  expect(box).toHaveStyle('width: auto')
  expect(box).toHaveStyle('margin-bottom: 1.25rem')
  expect(box).toHaveStyle('margin-top: 1.25rem')
  expect(box).toHaveStyle('box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);')
  expect(box).toHaveStyle('padding: 1.25rem 1.25rem 1.25rem 1.25rem;')
  expect(box).toHaveStyle('border-radius: 0.125rem;')
  expect(box).toHaveStyle('font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";')
  expect(box).toHaveStyle('color: rgb(0, 49, 130);')
  expect(box).toHaveStyle('background-color: rgb(125, 177, 255);')
})

it.each`
  as
  ${'header'}
  ${'p'}}
`(
  'should display Box with type as $as',
  async ({ as }) => {
    const inlineAttrs = `as=${as}`
    const { asFragment } = renderComponent({ inlineAttrs })

    expect(asFragment()).toMatchSnapshot()
  }
)
