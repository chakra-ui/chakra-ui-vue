import { storiesOf } from '@storybook/vue'

storiesOf('Directives | Chakra', module)
  .add('Base usage - No arguments', () => ({
    template: `
      <div>
        <div v-chakra="{
          _hover: {
            color: 'green.400',
            fontWeight: 'bold'
          }
        }" p="3" color="red.400" font-weight="bold">Welcome to Chakra directive</div>
      </div>
    `
  }))
