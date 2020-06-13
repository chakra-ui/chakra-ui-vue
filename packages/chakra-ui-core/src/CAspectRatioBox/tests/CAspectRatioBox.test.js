import { CAspectRatioBox, CBox } from '../..'
import { render, screen } from '@/tests/test-utils'
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

/**
 * Not sure if we need jest-emotion
 *
 * Get styles from document.styleSheets
 * @param {String} selector
 */
function getElementStyles (selector) {
  selector = new RegExp(selector)
  let styles = []
  let i; let j; const sel = selector
  for (i = 0; i < document.styleSheets.length; ++i) {
    for (j = 0; j < document.styleSheets[i].cssRules.length; ++j) {
      if (sel.test(document.styleSheets[i].cssRules[j].selectorText)) {
        // let selectorText = document.styleSheets[i].cssRules[j].selectorText
        const cssText = document.styleSheets[i].cssRules[j].style.cssText
        styles += cssText
      }
    }
  }
  return styles
}

it('should render correctly', () => {
  const inlineAttrs = ':ratio="1"'
  const { asFragment } = renderComponent({ inlineAttrs })
  expect(asFragment()).toMatchSnapshot()

  const [, emotionClassName] = [...screen.getByTestId('aspectRatioBox').classList]
  const pseudoStyles = getElementStyles(`.${emotionClassName}:before`)

  expect(pseudoStyles).toContain(`
    padding-bottom: 100%
  `.trim())
})

it('should have correct styles', () => {
  const inlineAttrs = ':ratio="2"'
  renderComponent({ inlineAttrs })
  const image = screen.getByTestId('image')
  const aspectRatioBox = screen.getByTestId('aspectRatioBox')

  const [, emotionClassName] = [...aspectRatioBox.classList]
  const pseudoStyles = getElementStyles(`.${emotionClassName}:before`)

  expect(pseudoStyles).toContain(`
    padding-bottom: 50%
  `.trim())

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
})
