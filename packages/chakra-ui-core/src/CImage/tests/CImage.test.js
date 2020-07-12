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
      // Mock the Image.prototype.onload/onerror implementations
      this.onload = jest.fn().mockImplementation(fn => fn)
      this.onerror = jest.fn().mockImplementation(err => err)
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
