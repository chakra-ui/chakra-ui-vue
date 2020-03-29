import { CBox, CCheckbox, CCheckboxGroup } from '../..'
import { render, defaultProviders } from '@/tests/test-utils'

// mocks
import { useId } from '@/packages/chakra-ui-core/src/utils'
jest.mock('@/packages/chakra-ui-core/src/utils/generators.js')
jest.mock('breadstick/dist/components/Alert/styles.css', () => ({})) // jest tries to import styles and fails...

const renderComponent = (props) => {
  const base = {
    components: { CBox, CCheckbox, CCheckboxGroup },
    provide: () => defaultProviders(),
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
  const { getByText } = renderComponent()
  expect(getByText('One')).toBeInTheDocument()
  expect(getByText('Two')).toBeInTheDocument()
  expect(getByText('Three')).toBeInTheDocument()
})

test('selectedValues prop works', () => {
  const { getByTestId } = renderComponent()

  const one = getByTestId('one').querySelector('input')
  const two = getByTestId('two').querySelector('input')
  const three = getByTestId('three').querySelector('input')

  expect(one).not.toBeChecked()
  expect(two).toBeChecked()
  expect(three).not.toBeChecked()
})
