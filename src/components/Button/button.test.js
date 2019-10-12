import { shallowMount } from '@vue/test-utils'
import Button from './index.vue'

describe('===== Button Component =====', () => {
  let button
  describe('Instance Tests', () => {
    it('should be a Vue instance', () => {
      button = shallowMount(Button, {
        provide: {
          KiwiTheme: {}
        }
      })
      expect(button.isVueInstance()).toBeTruthy()
    })
  })
})
