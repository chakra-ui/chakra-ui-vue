import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CBox, CTextarea } from '..'

storiesOf('UI | Textarea', module)
  .add('Basic Usage', () => ({
    components: { CBox, CTextarea },
    template: `
      <CBox w="300px">
        <CTextarea
          v-model="textareaContent"
          maxWidth="sm"
          mx="auto"
          mt="2"
          placeholder="Here is a sample placeholder"
          size="md"
          :value="textareaContent"
        />
      </CBox>
    `,
    data () {
      return {
        textareaContent: 'Jonathan Bakebwa is awesome'
      }
    },
    methods: {
      action: action()
    }
  }))
  .add('Basic Usage with Event', () => ({
    components: { CBox, CTextarea },
    template: `
      <CBox w="300px">
        <CTextarea
          v-model="textareaContent"
          maxWidth="sm"
          mx="auto"
          mt="2"
          placeholder="Here is a sample placeholder"
          size="md"
          :value="textareaContent"
          @change="handleChange"
        />
      </CBox>
    `,
    data () {
      return {
        textareaContent: 'Jonathan Bakebwa is awesome'
      }
    },
    methods: {
      action: action(),
      handleChange (e) {
        this.textareaContent = 'You are beautiful :)'
      }
    }
  }))
