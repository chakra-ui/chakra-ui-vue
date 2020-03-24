import { storiesOf } from '@storybook/vue'
import { Editable, EditablePreview, EditableInput, Box, Button, ButtonGroup, Flex } from '..'

const ControlButtons = {
  name: 'ControlButtons',
  components: { Button, ButtonGroup, Flex },
  props: ['isEditing', 'onSubmit', 'onCancel', 'onRequestEdit'],
  template: `
  <Flex>
    <ButtonGroup size="sm" v-if="isEditing">
      <Button color="green" @click="onSubmit">Save</Button>
      <Button @click="onCancel">Cancel</Button>
    </ButtonGroup>
    <Button size="sm" @click="onRequestEdit" v-else>Edit</Button>
  </Flex>
  `
}

storiesOf('UI | Editable', module)
  .addDecorator(story => ({
    components: { Box, story: story() },
    template: `
      <Box maxWidth="lg" mx="auto" mt="6" p="6">
        <story></story>
      </Box>`
  }))

  .add('Default', () => ({
    components: { Box, Editable, EditablePreview, EditableInput },
    template: `
    <Box w="sm">
        <Editable defaultValue="Take some chakra ⚡️ (click me)" fontSize="2xl">
        <EditablePreview />
        <EditableInput />
        </Editable>
    </Box>
    `
  }))

  .add('Custom Controls', () => ({
    components: { ControlButtons, Box, Editable, EditablePreview, EditableInput },
    template: `
    <Box w="sm">
        <Editable defaultValue="Click Edit Button ⚡️" :submitOnBlur="false" :isPreviewFocusable="false" fontSize="2xl">
          <template v-slot="props">
            <EditablePreview />
            <EditableInput />
            <ControlButtons v-bind="props"></ControlButtons>
          </template>
        </Editable>
    </Box>
    `
  }))
