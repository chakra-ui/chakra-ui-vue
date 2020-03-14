import { storiesOf } from '@storybook/vue'
import { Flex, Box, Text as KText } from '..'

storiesOf('UI | Flex', module)
  .add('Flex', () => ({
    components: { Flex, Box, KText },
    template: `
      <div>
      <Flex align="center">
        <Flex bg="green.50" align="flex-end">
          <KText>Box 1</KText>
        </Flex>
        <Flex bg="blue.50" size="150px" align="center" justify="center">
          <KText textAlign="center" bg="orange.50">
            Box 2
          </KText>
        </Flex>
        <Box>
          <KText bg="tomato" color="white">
            Box 3
          </KText>
        </Box>
      </Flex>
      </div>
    `
  }))
