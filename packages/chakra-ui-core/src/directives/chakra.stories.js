import { storiesOf } from '@storybook/vue'

storiesOf('Directives | Chakra', module)
  .add('Base usage - No arguments', () => ({
    template: `
      <div>
        <div v-chakra p="3" bg="red.100" rounded="md" color="red.500" font-weight="bold">Welcome to Chakra directive</div>
      </div>
    `
  }))
  .add('With value | Styles object', () => ({
    template: `
      <div>
        <div v-chakra="{
          p: 3,
          shadow: 'sm',
          h1: {
            bg: 'blue.100'
          },
        }">
          <h1>Title</h1>
          <p>Text</p>
        </div>
      </div>
    `
  }))
  .add('With value | Function', () => ({
    template: `
      <div>
        <div v-chakra="theme => ({
          shadow: 'sm',
          bg: theme.colors.blue[800],
          color: theme.colors.yellow[300],
          p: {
            fontWeight: 'bold',
            p: 3
          }
        })">
          <p>Computed styles</p>
        </div>
      </div>
    `
  }))
  .add('Demo button', () => ({
    template: `
      <div>
        <button v-chakra="{
          ':hover': { bg: 'green.400' },
          ':focus': { shadow: 'outline' }
        }" font-weight="bold" px="4" py="3" color="white" rounded="md" bg="blue.400" outline="none">
          Button
        </button>
      </div>
    `
  }))
