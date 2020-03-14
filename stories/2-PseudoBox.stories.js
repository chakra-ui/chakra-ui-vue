import { storiesOf } from '@storybook/vue'
import { Box, PseudoBox } from '../packages/chakra-ui-core/src'

storiesOf('UI | PseudoBox', module)
  .add('PseudoBox | :hover', () => ({
    components: { PseudoBox },
    template: `
      <PseudoBox
        bg="vue.300"
        color="vue.800"
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
  .add('Pseudobox | :odd', () => ({
    components: { Box, PseudoBox },
    data () {
      return {
        boxes: [
          {
            id: 1,
            name: 'Box 1'
          },
          {
            id: 2,
            name: 'Box 2'
          },
          {
            id: 3,
            name: 'Box 3'
          }
        ]
      }
    },
    template: `
      <Box
        rounded="md"
        overflow="hidden"
        mt="4"
        w="400px"
        font-family="body"
      >
        <PseudoBox
          v-for="(box, index) in boxes"
          :key="index"
          px="4"
          py="2"
          bg="white"
          :_hover="{ opacity: '80%' }"
          :_odd="{ bg: 'gray.100' }"
          >
          {{ box.name }}
        </PseudoBox>
      </Box>
    `
  }))
