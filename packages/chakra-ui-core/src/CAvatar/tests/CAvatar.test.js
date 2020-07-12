import { CAvatar, CAvatarBadge } from '..'
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
    components: { CAvatar, CAvatarBadge },
    template: '<CAvatar name="Mesut Koca" data-testid="avatar" src="LOAD_SUCCESS_SRC"></CAvatar>',
    ...props
  }
  return render(base)
}

it('should render correctly', async () => {
  const { asFragment } = renderComponent()

  await waitMs() // wait for img.onsuccess to be called.

  expect(asFragment()).toMatchSnapshot()
})

it('Avatar with AvatarBadge renders correctly', async () => {
  const { asFragment } = renderComponent({
    template: `
    <CAvatar
      name="Mesut Koca"
      src="LOAD_SUCCESS_SRC"
    >
      <CAvatarBadge size="1.0em" bg="green.500" />
    </CAvatar>
  `
  })

  await waitMs() // wait for img.onsuccess to be called.

  expect(asFragment()).toMatchSnapshot()
})

it('renders an image', async () => {
  renderComponent({ template: '<CAvatar name="Mesut Koca" src="LOAD_SUCCESS_SRC" />' })

  await wait(() => {
    expect(screen.getByAltText(/Mesut Koca/i)).toBeInTheDocument()
  })
})

it('renders a name avatar if no src', async () => {
  renderComponent({ template: '<CAvatar name="Mesut Koca" />' })

  await wait(() => {
    expect(screen.getByLabelText(/Mesut Koca/i)).toBeInTheDocument()
    expect(screen.getByText('MK')).toBeInTheDocument()
  })
})

it('renders a name avatar if src fails', async () => {
  renderComponent({ template: '<CAvatar name="Mesut Koca" src="LOAD_FAILURE_SRC" />' })

  await wait(() => {
    expect(screen.queryByAltText(/Mesut Koca/i)).not.toBeInTheDocument()
    expect(screen.getByText('MK')).toBeInTheDocument()
  })
})
