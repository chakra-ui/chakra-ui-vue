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
  .add('Flex grow', () => ({
    components: { CFlex, CBox, CText },
    template: `
      <CFlex w="600px" align="center">
        <CBox flex-grow="2" w="10" mr="3" h="10" bg="blue.100">1</CBox>
        <CBox rounded-top="lg" w="10" mr="3" h="10" bg="blue.100">1</CBox>
        <CBox rounded-right="lg" w="10" mr="3" h="10" bg="blue.100">2</CBox>
        <CBox rounded-bottom="lg" w="10" mr="3" h="10" bg="blue.100">3</CBox>
        <CBox rounded-right="lg" w="10" mr="3" h="10" bg="blue.100">4</CBox>
        <CBox border-top-right-radius="lg" w="10" mr="3" h="10" bg="blue.100">5</CBox>
        <CBox border-top-left-radius="lg" w="10" mr="3" h="10" bg="blue.100">6</CBox>
        <CBox border-bottom-right-radius="lg" w="10" mr="3" h="10" bg="blue.100">7</CBox>
        <CBox border-bottom-left-radius="lg" w="10" h="10" bg="blue.100">8</CBox>
      </CFlex>
    `
  }))
