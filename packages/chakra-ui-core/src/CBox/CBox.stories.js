import { storiesOf } from '@storybook/vue'
import CBox from '../CBox'

storiesOf('UI | Box', module)
  .add('Box', () => ({
    components: { CBox },
    template: `
      <div>
        <CBox
          :w="['auto']"
          px="5"
          py="5"
          shadow="lg"
          my="5"
          mb="5"
          rounded="sm"
          font-family="body"
          background-color="blue.200"
          color="blue.700"
        >
          This is box component
        </CBox>
      </div>
    `
  }))
  .add('Box with custom values', () => ({
    components: { CBox },
    template: `
      <div>
        <CBox
          position="relative"
          w="300px"
          h="200px"
          overflow="hidden"
          rounded="20px"
        >
          <CBox
            as="img"
            font-family="body"
            objectFit="contain"
            src="https://images.unsplash.com/photo-1600002415506-dd06090d3480?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          />
          <CBox px="5" display="flex" flex-direction="column" justify-content="center" py="3" h="full" pos="absolute" top="0" left="0" bg="pink.200" w="50%">
            <CBox as="h1" font-size="xl" font-weight="bold">
              Tempations
            </CBox>
            <CBox as="p" font-size="md">
              Spacial cakes for special moments.
            </CBox>
          </CBox>
        </CBox>
      </div>
    `
  }))
