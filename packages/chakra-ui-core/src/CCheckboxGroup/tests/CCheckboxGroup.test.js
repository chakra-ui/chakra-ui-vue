import { CBox, CCheckbox, CCheckboxGroup } from '../..'
import { render, screen, wait } from '@/tests/test-utils'

// mocks
import { useId } from '@/packages/chakra-ui-core/src/utils'
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')

const renderComponent = (props) => {
  const base = {
    components: { CBox, CCheckbox, CCheckboxGroup },
    data: () => ({ selectedValues: ['two'] }),
    template: `
    <CBox w="300px">
      <CCheckboxGroup name="numbers" v-model="selectedValues" variantColor="green" :defaultValue="['two']">
        <CCheckbox data-testid="one" value="one">One</CCheckbox>
        <CCheckbox data-testid="two" value="two">Two</CCheckbox>
        <CCheckbox data-testid="three" value="three">Three</CCheckbox>
      </CCheckboxGroup>
    </CBox>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  useId.mockReturnValueOnce('1')
  useId.mockReturnValueOnce('2')
  useId.mockReturnValueOnce('3')

  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  renderComponent()
  expect(screen.getByText('One')).toBeInTheDocument()
  expect(screen.getByText('Two')).toBeInTheDocument()
  expect(screen.getByText('Three')).toBeInTheDocument()
})

test('selectedValues prop works', () => {
  renderComponent()

  wait(() => {
    expect(screen.getByLabelText('One')).not.toBeChecked()
    expect(screen.getByLabelText('Two')).toBeChecked()
    expect(screen.getByLabelText('Three')).not.toBeChecked()
  })
})
