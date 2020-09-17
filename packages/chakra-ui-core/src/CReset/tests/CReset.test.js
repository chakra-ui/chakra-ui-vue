import CReset from '../'
import { render, defaultProviders } from '@/tests/test-utils'

const renderComponent = (options = {}) => {
    return render(
        CReset, 
        options, 
        () => ({ provide: defaultProviders() })
    )
}

describe('CReset.vue', () => {

  it('should render correctly', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

})
