import CReset from '../'
import { mount } from '@/tests/test-utils'

describe('CReset.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CReset)
  })

  it('should render correctly', () => {
    expect(wrapper.is(CReset)).toBe(true)
    expect(wrapper.isEmpty()).toBe(true)
  })

  it('should have theme, colorMode, & styleConfig properties', () => {
    expect(wrapper.vm).toHaveProperty('theme')
    expect(wrapper.vm).toHaveProperty('colorMode')
    expect(wrapper.vm).toHaveProperty('styleConfig')
    wrapper.destroy()
  })

  it('should have default style config', () => {
    expect(wrapper.vm.styleConfig).toMatchSnapshot()
    wrapper.destroy()
  })

  it('should accept style config prop', () => {
    const config = (theme, original) => {
      original.light.color = 'black'
      original.light.bg = 'yellow'

      return original
    }

    wrapper.setProps({ config })

    // extract the config prop validator function
    const validator = wrapper.vm.$options.props.config.validator
    expect(validator(config)).toBe(true)
    expect(validator({})).toBe(false)

    expect(wrapper.vm.styleConfig).toMatchSnapshot()

    wrapper.destroy()
  })
})
