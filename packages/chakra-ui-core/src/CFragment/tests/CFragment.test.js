import CFragment from '..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { CFragment },
    template: `<div class="fragment"><CFragment><span>1</span><span>2</span></CFragment></div>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
