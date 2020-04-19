import { CBox, CTag, CTagLabel, CTagIcon, CTagCloseButton, CAvatar } from '../..'
import { render, defaultProviders } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CBox, CTag, CTagLabel, CTagIcon, CTagCloseButton, CAvatar },
    provide: () => ({
      ...defaultProviders(),
      $chakraIcons: {
        'email': {
          path: `
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"
              />
            `
        }
      }
    }),
    template: `
    <CBox mb="3">
      <CTag size="sm"  variantColor="green">
        <CTagIcon icon="add" size="12px" />
        <CTagLabel>Green</CTagLabel>
      </CTag>
    </CBox>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  const { getByText } = renderComponent()

  expect(getByText('Green')).toBeInTheDocument()
})

it('should display tag with right icon', () => {
  const { asFragment } = renderComponent({ template: `
  <CBox mb="3">
    <CTag size="sm" variantColor="green">
      <CTagLabel>Green</CTagLabel>
      <CTagIcon icon="add" size="12px" />
    </CTag>
  </CBox>
  ` })
  expect(asFragment()).toMatchSnapshot()
})
it('should display tag with custom element', () => {
  const { asFragment } = renderComponent({ template: `
  <CBox mb="3">
    <CTag rounded="full" variantColor="red">
      <CAvatar
        name="Mesut Koca"
        size="xs"
        src="https://pbs.twimg.com/profile_images/953743486842474496/cOrUdK4z_200x200.jpg"
      />
      <CTagLabel>Mesut</CTagLabel>
    </CTag>
  </CBox>
  ` })
  expect(asFragment()).toMatchSnapshot()
})
