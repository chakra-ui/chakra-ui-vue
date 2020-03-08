import { Avatar } from '@/packages/kiwi-core/src/Avatar'
import AvatarGroup from '@/packages/kiwi-core/src/AvatarGroup'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      Avatar,
      AvatarGroup
    },
    template: `
    <AvatarGroup max="2">
      <Avatar
        name="Mesut Koca"
        src="https://pbs.twimg.com/profile_images/953743486842474496/cOrUdK4z_200x200.jpg"
      />
      <Avatar
        name="Evan You"
        src="https://pbs.twimg.com/profile_images/888432310504370176/mhoGA4uj_400x400.jpg"
      />
      <Avatar
        name="Jonathan Bakebwa"
        src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
      />
    </AvatarGroup>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
