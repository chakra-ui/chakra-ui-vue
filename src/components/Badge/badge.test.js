import { shallowMount } from '@vue/test-utils'
import Badge from './'
import ThemeProvider from '../ThemeProvider'
import theme from '../../lib/theme'

describe('===== Badge Component =====', () => {
  describe('Instance TEsts', () => {
    it('should be a Vue instance', () => {
      const wrapper = shallowMount(ThemeProvider, {
        propsData: {
          theme,
          colorMode: 'light'
        },
        slots: {
          default: [Badge]
        }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.find(Badge).vm.$theme()).toBe(theme)
      expect(wrapper.find(Badge).vm.$colorMode).toBe('light')
    })
  })
})
