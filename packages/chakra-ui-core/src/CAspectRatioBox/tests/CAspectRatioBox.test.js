import { CAspectRatioBox, CBox } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CAspectRatioBox, CBox },
    template: `
    <CAspectRatioBox maxW="400px" data-testid="aspectRatioBox" ${inlineAttrs}>
      <CBox as="img" src="https://bit.ly/naruto-sage" alt="naruto" objectFit="cover" data-testid="image" />
    </CAspectRatioBox>
    `,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const inlineAttrs = `:ratio="1"`
  const { asFragment } = renderComponent({ inlineAttrs })
  expect(asFragment()).toMatchSnapshot()
})

it('should have correct styles', async () => {
  const inlineAttrs = `:ratio="2"`
  const { getByTestId } = renderComponent({ inlineAttrs })
  const image = getByTestId('image')
  const aspectRatioBox = getByTestId('aspectRatioBox')

  expect(aspectRatioBox).toHaveStyle(`
    max-width: 400px;
    position: relative;
  `)

  expect(image).toHaveStyle(`
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  `)

  // TODO: we can't test pseudo elements.. so better test styles?
  // aspectRatioBox padding-bottom
})
