import { shallowMount } from '@vue/test-utils'
import Button from '../../lib/core/'
import Theme from '../../../kiwi.config'

describe('===== Button Component =====', () => {
  let button
  describe('Instance Tests', () => {
    it('should be a Vue instance', () => {
      button = shallowMount(Button, {
        provide () {
          return {
            $theme: () => Theme,
            $colorMode: 'light'
          }
        }
      })
      expect(button.isVueInstance()).toBeTruthy()
    })
  })
})
