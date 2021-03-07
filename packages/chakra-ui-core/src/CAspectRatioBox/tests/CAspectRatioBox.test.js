import { CAspectRatioBox, CBox } from '../..'
import { render, screen, getElementStyles } from '@/tests/test-utils'
const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CAspectRatioBox, CBox },
    template: `
    <CAspectRatioBox maxW="400px" data-testid="aspectRatioBox" ${inlineAttrs}>
      <CBox data-testid="child">
        <CBox as="img" src="https://bit.ly/naruto-sage" alt="naruto" objectFit="cover" h="100%" w="100%" data-testid="image" />
      </CBox>
    </CAspectRatioBox>
    `,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const inlineAttrs = ':ratio="1"'
  const { asFragment } = renderComponent({ inlineAttrs })
  expect(asFragment()).toMatchSnapshot()

  const [emotionClassName] = [...screen.getByTestId('aspectRatioBox').classList]
  const pseudoStyles = getElementStyles(`.${emotionClassName}:before`)

  expect(pseudoStyles).toContain(
    `
    padding-bottom: 100%
  `.trim()
  )
})

it('should have correct styles', () => {
  const inlineAttrs = ':ratio="2"'
  renderComponent({ inlineAttrs })
  const image = screen.getByTestId('image')
  const aspectRatioBox = screen.getByTestId('aspectRatioBox')
  const child = screen.getByTestId('child')

  const [emotionClassName] = [...aspectRatioBox.classList] // second className has the pseudo styles
  const pseudoStyles = getElementStyles(`.${emotionClassName}:before`)

  expect(pseudoStyles).toContain(
    `
    padding-bottom: 50%
  `.trim()
  )

  expect(aspectRatioBox).toHaveStyle(`
    max-width: 400px;
    position: relative;
  `)

  // aspectRatioBox should contain exactly 1 immediate child
  expect(aspectRatioBox.childElementCount).toEqual(1)

  expect(child).toHaveStyle(`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  `)

  expect(child).not.toBeEmpty()

  expect(image).toHaveStyle(`
    object-fit: cover;
    width: 100%;
    height: 100%;
  `)
})
