import { storiesOf } from '@storybook/vue'
import { CEditable, CEditablePreview, CEditableInput, CBox, CButton, CButtonGroup, CFlex } from '..'

const ControlButtons = {
  name: 'ControlButtons',
  components: { CButton, CButtonGroup, CFlex },
  props: ['isEditing', 'onSubmit', 'onCancel', 'onRequestEdit'],
  template: `
  <CFlex>
    <CButtonGroup size="sm" v-if="isEditing">
      <CButton color="green" @click="onSubmit">Save</CButton>
      <CButton @click="onCancel">Cancel</CButton>
    </CButtonGroup>
    <CButton size="sm" @click="onRequestEdit" v-else>Edit</CButton>
  </CFlex>
  `
}

storiesOf('UI | Editable', module)
  .addDecorator(story => ({
    components: { CBox, story: story() },
    template: `
      <CBox maxWidth="lg" mx="auto" mt="6" p="6">
        <story></story>
      </CBox>`
  }))

  .add('Default', () => ({
    components: { CBox, CEditable, CEditablePreview, CEditableInput },
    template: `
    <CBox w="sm">
      <CEditable defaultValue="Take some chakra ⚡️ (click me)" fontSize="2xl">
        <CEditablePreview />
        <CEditableInput :_focus="{
          shadow: '0 0 0 3px rgba(169, 97, 243, 0.6)'
        }" />
      </CEditable>
    </CBox>
    `
  }))

  .add('Custom Controls', () => ({
    components: { ControlButtons, CBox, CEditable, CEditablePreview, CEditableInput },
    template: `
    <CBox w="sm">
        <CEditable defaultValue="Click Edit Button ⚡️" :submitOnBlur="false" :isPreviewFocusable="false" fontSize="2xl">
          <template v-slot="props">
            <CEditablePreview />
            <CEditableInput />
            <ControlButtons v-bind="props"></ControlButtons>
          </template>
        </CEditable>
    </CBox>
    `
  }))
