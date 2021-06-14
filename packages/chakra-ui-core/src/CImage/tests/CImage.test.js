import { CImage } from '../..'
import { render, wait, waitMs, screen } from '@/tests/test-utils'
const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC'
const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC'

beforeAll(() => {
  process.browser = true // Mock process.browser for CAvatar created()
})

beforeAll(() => {
  // Mock Img
  // eslint-disable-next-line accessor-pairs
  Object.defineProperty(global.Image.prototype, 'src', {
    set (src) {
      if (src === LOAD_FAILURE_SRC) {
        setTimeout(() => this.onerror(new Error('mocked error')))
      } else if (src === LOAD_SUCCESS_SRC) {
        setTimeout(() => this.onload())
      }
    }
  })
})

const renderComponent = (props) => {
  const base = {
    components: { CImage },
    template: '<CImage alt="Mesut Koca" data-testid="avatar" src="LOAD_SUCCESS_SRC"></CImage>',
    ...props
  }
  return render(base)
}

it('should render correctly', async () => {
  const { asFragment } = renderComponent()

  await waitMs() // wait for img.onsuccess to be called.

  expect(asFragment()).toMatchSnapshot()
})

it('fallback src works', async () => {
  renderComponent({ template: '<CImage alt="Mesut Koca" src="LOAD_FAILURE_SRC" fallback-src="LOAD_FALLBACK_SRC" />' })

  await wait(() => {
    expect(screen.getByAltText(/Mesut Koca/i)).toHaveAttribute('src', 'LOAD_FALLBACK_SRC')
  })
})

it('"srcset" should work and be prioritized over "src" if provided to CImage', async () => {
  const { asFragment } = renderComponent({ template: '<CImage alt="My Image Description" src="LOAD_SUCCESS_SRC" srcset="LOAD_SUCCESS_SRC 400w" />' })
  await wait(() => {
    expect(screen.getByAltText(/My Image Description/i)).toHaveAttribute('srcset', 'LOAD_SUCCESS_SRC 400w')
    expect(asFragment()).toMatchSnapshot()
  })
})

it('should use src if srcset provided is undefined', async () => {
  const { asFragment } = renderComponent({ template: '<CImage alt="My Image Description" src="LOAD_SUCCESS_SRC" srcset="LOAD_FAILURE_SRC" />' })
  await wait(() => {
    expect(screen.getByAltText(/My Image Description/i)).toHaveAttribute('src', 'LOAD_SUCCESS_SRC')
    expect(asFragment()).toMatchSnapshot()
  })
})
