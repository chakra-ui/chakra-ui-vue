import { CSkipNavLink, CSkipNavContent } from '../CSkipNav'
import { fireEvent, render, userEvent, screen, wait } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CSkipNavLink, CSkipNavContent },
    template: `
    <div>
      <CSkipNavLink>Skip to Content</CSkipNavLink>
      <CSkipNavContent>
        <main>
          <form>
            <input type="text" placeholder="Search" />
          </form>
        </main>
      </CSkipNavContent>
    </div>
    `,
    ...props
  }
  return render(base)
}

const getSkipLink = () => screen.getByText('Skip to Content')

const getContentWrapper = () => screen.getByTestId('chakra-skip-nav')

const triggerSkipLink = async () => {
  const link = getSkipLink()
  await fireEvent.keyDown(link, {
    key: 'Enter',
    code: 'Enter'
  })
}

describe('CSkipNav', () => {
  beforeEach(async () => {
    renderComponent()
    await userEvent.tab()
  })

  it('should be tabbed to link after initial render', () => {
    const link = getSkipLink()
    expect(link).toHaveAttribute('href', '#chakra-skip-nav')
  })

  it('should navigate to content wrapper on selecting skip link', async () => {
    await triggerSkipLink()
    const contentWrapper = getContentWrapper()

    wait(() => {
      expect(contentWrapper).toHaveFocus()
    })
  })

  it('should tab to input after wrapper focus', async () => {
    await triggerSkipLink()
    await userEvent.tab()

    const input = screen.getByPlaceholderText('Search')

    expect(input).toHaveFocus()
  })
})
