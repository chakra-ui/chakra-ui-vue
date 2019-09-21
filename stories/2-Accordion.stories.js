import { action } from '@storybook/addon-actions'

import Accordion from './Accordion.vue'

export default {
  title: 'Accordion'
}

export const userForm = () => ({
  components: { Accordion },
  template: `
    <accordion @click="action" />
  `,
  methods: {
    action: action('clicked accordion')
  }
})
