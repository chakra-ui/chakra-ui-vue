import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CBox, CStack, CSelect } from '..'

storiesOf('UI | Select', module)
  .add('Basic Usage', () => ({
    components: { CBox, CSelect },
    template: `
      <CBox mb="3" w="300px">
        <CSelect v-model="value" id="test" placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </CSelect>
      </CBox>
    `,
    data () {
      return {
        value: 'option3'
      }
    },
    watch: {
      value (newValue) {
        this.action('Selected value', newValue)
      }
    },
    methods: {
      action: action()
    }
  }))
  .add('Changing select size', () => ({
    components: { CStack, CSelect },
    template: `
      <CStack spacing="3" w="300px">
        <CSelect placeholder="large size" size="lg" />
        <CSelect placeholder="default size" size="md" />
        <CSelect placeholder="small size" size="sm" />
      </CStack>
    `
  }))
  .add('Changing variant', () => ({
    components: { CStack, CSelect },
    template: `
      <CStack spacing="3" w="300px">
        <CSelect placeholder="Outline" variant="outline" />
        <CSelect placeholder="Filled" variant="filled" />
        <CSelect placeholder="Flushed" variant="flushed" />
        <CSelect placeholder="Unstyled" variant="unstyled" />
      </CStack>
    `
  }))
  .add('Override styles', () => ({
    components: { CSelect },
    template: `
      <CSelect
        backgroundColor="tomato"
        borderColor="tomato"
        color="white"
        placeholder="Woohoo! A new background color!"
      />
    `
  }))
  .add('Disabled select', () => ({
    components: { CSelect },
    template: `
    <CBox mb="3" w="300px">
      <CSelect v-model="value" id="test" :isDisabled="true" placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </CSelect>
    </CBox>
    `,
    data () {
      return {
        value: 'option3'
      }
    },
    watch: {
      value (newValue) {
        this.action('Selected value', newValue)
      }
    },
    methods: {
      action: action()
    }
  }))
