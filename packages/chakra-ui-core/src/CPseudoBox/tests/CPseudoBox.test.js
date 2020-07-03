import serializer from 'jest-emotion'
import CPseudoBox from '../'
import { render, getTagName } from '@/tests/test-utils'

expect.addSnapshotSerializer(serializer)

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CPseudoBox },
    template: `<CPseudoBox data-testid="pseudobox" ${inlineAttrs}>Box Works</CPseudoBox>`,
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

  const pseudobox = getByTestId('pseudobox')

  expect(asFragment()).toMatchSnapshot()
  expect(pseudobox).toHaveStyle('display: flex')
  expect(pseudobox).toHaveStyle('width: auto')
  expect(pseudobox).toHaveStyle('margin-bottom: 1.25rem')
  expect(pseudobox).toHaveStyle('margin-top: 1.25rem')
  expect(pseudobox).toHaveStyle('box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);')
  expect(pseudobox).toHaveStyle('padding: 1.25rem 1.25rem 1.25rem 1.25rem;')
  expect(pseudobox).toHaveStyle('border-radius: 0.125rem;')
  expect(pseudobox).toHaveStyle('font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";')
  expect(pseudobox).toHaveStyle('color: rgb(0, 49, 130);')
  expect(pseudobox).toHaveStyle('background-color: rgb(125, 177, 255);')
})

it.each`
  as
  ${'header'}
  ${'p'}}
`(
  'should display Box with type as $as',
  ({ as }) => {
    const inlineAttrs = `as=${as}`
    const { asFragment, getByTestId } = renderComponent({ inlineAttrs })
    expect(getTagName(getByTestId('pseudobox'))).toEqual(as)
    expect(asFragment()).toMatchSnapshot()
  }
)

// TODO: How to test _hover or focus styles?
