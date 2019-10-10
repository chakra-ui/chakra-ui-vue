import { shallowMount } from '@vue/test-utils'
import Badge from './index.vue'

describe('===== Badge Component =====', () => {
  let badge
  describe('Instance TEsts', () => {
    it('should be a Vue instance', () => {
      badge = shallowMount(Badge)
      expect(badge.isVueInstance()).toBeTruthy()
    })
  })
})
