import { CGrid, CGridItem } from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CGrid, CGridItem },
    template: `<CGrid ${inlineAttrs}>Grid Me</CGrid>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should change gap', () => {
  const inlineAttrs = 'w="600px" template-columns="repeat(5, 1fr)" gap="6"'
  const { asFragment } = renderComponent({ inlineAttrs })

  expect(asFragment()).toMatchSnapshot()
})

it('should offset columns', () => {
  const inlineAttrs = 'col-start="4" col-end="6"'
  const { asFragment } = renderComponent({
    template: `
      <CGrid w="600px" template-columns="repeat(5, 1fr)" gap="6">
        <CGridItem ${inlineAttrs}>I'm in a grid item</CGridItem>
      </CGrid>`
  })
  expect(asFragment()).toMatchSnapshot()
})

it('should span columns', () => {
  const inlineAttrs = 'col-span="2"'
  const { asFragment } = renderComponent({
    template: `
      <CGrid w="600px" template-columns="repeat(5, 1fr)" gap="6">
        <CGridItem ${inlineAttrs}>I'm in a grid item</CGridItem>
      </CGrid>`
  })
  expect(asFragment()).toMatchSnapshot()
})
