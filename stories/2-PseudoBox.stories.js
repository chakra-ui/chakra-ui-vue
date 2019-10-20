import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import PseudoBox from '../src/components/PseudoBox'

storiesOf('UI | PseudoBox', module)
  .addDecorator(centered)
  .add('PseudoBox', () => ({
    components: { PseudoBox },
    template: `
      <PseudoBox
        bg="teal.300"
        color="teal.800"
        p="3"
        rounded="md"
        bl="4px"
        font-family="body"
        transition="all 0.2s ease-in-out"
        shadow="md"
        :_hover="{
          bg: 'red.200',
          color: 'red.700'
        }"
        :_focus="{
          bg: 'indigo.200',
          color: 'indigo.700'
        }"
      >
        This is the PseudoBox component. With it you can bind pseudo styles! Try hovering over this component.
      </PseudoBox>
    `
  }))
