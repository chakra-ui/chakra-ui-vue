import { shallowMount } from '@vue/test-utils'
import Badge from './'
import theme from '../../lib/theme'

describe('===== Badge Component =====', () => {
  describe('Instance TEsts', () => {
    it('should be a Vue instance', () => {
      const badge = shallowMount(Badge, {
        provide () {
          return {
            $theme: () => theme,
            $colorMode: 'light'
          }
        }
      })
      expect(badge.isVueInstance()).toBeTruthy()
      expect(badge.vm.$theme()).toBe(theme)
      expect(badge.vm.$colorMode).toBe('light')
    })
  })
})
