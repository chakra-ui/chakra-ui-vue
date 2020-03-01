import Fragment from '../'
import { render } from '@/packages/kiwi-core/src/test-utils'

const renderComponent = (props) => {
  const base = {
    components: { Fragment },
    template: `<div class="fragment"><Fragment><span>1</span><span>2</span></Fragment></div>`,
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})
