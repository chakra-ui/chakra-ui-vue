import { CAvatar, CAvatarGroup } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CAvatar,
      CAvatarGroup
    },
    template: `
    <CAvatarGroup max="2">
      <CAvatar
        name="Mesut Koca"
        src="https://pbs.twimg.com/profile_images/953743486842474496/cOrUdK4z_200x200.jpg"
      />
      <CAvatar
        name="Evan You"
        src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
      />
      <CAvatar
        name="Jonathan Bakebwa"
        src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
      />
    </CAvatarGroup>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

test('renders a number avatar showing count of truncated avatars', () => {
  const { getByText } = renderComponent()

  getByText('+1')
})
