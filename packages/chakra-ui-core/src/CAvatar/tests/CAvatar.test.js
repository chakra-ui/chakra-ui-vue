import { CAvatar, CAvatarBadge } from '..'
import { render, fireEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CAvatar, CAvatarBadge },
    template: '<CAvatar name="Mesut Koca" data-testid=\'avatar\' src="http://mesut.dev"></CAvatar>',
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it("should render default avatar if name is not provided and image didn't load", async () => {
  const { container, asFragment } = renderComponent({ template: '<CAvatar data-testid="avatar" src="mesut.dev" />' })
  const image = container.querySelector('img')

  if (image) {
    await fireEvent.error(image)
  }

  expect(asFragment()).toMatchSnapshot()
})

// TODO: change mounted logic in avatar
xit('should render image if loaded correctly', () => {
  const { getByAltText } = renderComponent()

  expect(getByAltText('Mesut Koca')).toBeInTheDocument()
})

// TODO: change mounted logic in avatar
xit("should render avatar name as fallback if image didn't loaded correctly", async () => {
  const { getByAltText, queryByAltText, getByText } = renderComponent()
  const image = getByAltText('Mesut Koca')

  await fireEvent.error(image)

  expect(queryByAltText('Mesut Koca')).not.toBeInTheDocument()
  expect(getByText('MK')).toBeInTheDocument()
})
