import { CList, CListItem, CListIcon } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CList, CListItem, CListIcon },
    template: `
    <CList spacing="3">
      <CListItem>
        <CListIcon icon="check-circle" color="green.500" />Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </CListItem>
      <CListItem>
        <CListIcon icon="check-circle" color="green.500" />Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </CListItem>
    </CList>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})
