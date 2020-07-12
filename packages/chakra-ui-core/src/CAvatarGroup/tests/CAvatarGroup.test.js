import { CAvatar, CAvatarGroup } from '../..'
import { render, screen, waitMs } from '@/tests/test-utils'

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
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: {
      CAvatar,
      CAvatarGroup
    },
    template: `
    <CAvatarGroup max="2" ${inlineAttrs}>
      <CAvatar
        name="Mesut Koca"
        src="LOAD_SUCCESS_SRC"
      />
      <CAvatar
        name="Evan You"
        src="LOAD_SUCCESS_SRC"
      />
      <CAvatar
        name="Jonathan Bakebwa"
        src="LOAD_SUCCESS_SRC"
      />
    </CAvatarGroup>`,
    ...props
  }
  return render(base)
}

it('should render correctly', async () => {
  const { asFragment } = renderComponent()

  await waitMs() // wait for img.onsuccess to be called.

  expect(asFragment()).toMatchSnapshot()
})

it('should change avatar group size correctly', () => {
  const inlineAttrs = 'group-size="lg"'
  const { asFragment } = renderComponent({ inlineAttrs })
  expect(asFragment()).toMatchSnapshot()
})

test('renders a number avatar showing count of truncated avatars', () => {
  renderComponent()
  screen.getByText('+1')
})
