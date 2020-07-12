import { CBox, CTag, CTagLabel, CTagIcon, CTagCloseButton, CAvatar } from '../..'
import { render, screen } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CBox, CTag, CTagLabel, CTagIcon, CTagCloseButton, CAvatar },
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
  renderComponent()

  expect(screen.getByText('Green')).toBeInTheDocument()
})

it('should display tag with right icon', () => {
  const { asFragment } = renderComponent({
    template: `
    <CBox mb="3">
      <CTag size="sm" variantColor="green">
        <CTagLabel>Green</CTagLabel>
        <CTagIcon icon="add" size="12px" />
      </CTag>
    </CBox>`
  })
  expect(asFragment()).toMatchSnapshot()
})
it('should display tag with custom element', () => {
  const { asFragment } = renderComponent({
    template: `
    <CBox mb="3">
      <CTag rounded="full" variantColor="red">
        <CAvatar
          name="Mesut Koca"
          size="xs"
          src="https://pbs.twimg.com/profile_images/953743486842474496/cOrUdK4z_200x200.jpg"
        />
        <CTagLabel>Mesut</CTagLabel>
      </CTag>
    </CBox>`
  })
  expect(asFragment()).toMatchSnapshot()
})
