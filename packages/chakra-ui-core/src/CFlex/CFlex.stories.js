import { storiesOf } from '@storybook/vue'
import { CFlex, CBox, CText } from '..'

storiesOf('UI | Flex', module)
  .add('Flex', () => ({
    components: { CFlex, CBox, CText },
    template: `
      <CFlex align="center">
        <CFlex bg="green.50" align="flex-end">
          <CText>Box 1</CText>
        </CFlex>
        <CFlex bg="blue.50" size="150px" align="center" justify="center">
          <CText textAlign="center" bg="orange.50">
            Box 2
          </CText>
        </CFlex>
        <CBox>
          <CText bg="tomato" color="white">
            Box 3
          </CText>
        </CBox>
      </CFlex>
    `
  }))
