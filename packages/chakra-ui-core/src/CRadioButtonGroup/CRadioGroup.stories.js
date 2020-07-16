import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CFragment, CButton, CRadio, CRadioGroup, CRadioButtonGroup } from '..'

const CustomRadio = {
  name: 'CustomRadio',
  inheritAttrs: false,
  props: {
    isChecked: Boolean,
    isDisabled: Boolean,
    value: [String, Number]
  },
  render (h) {
    return h(CButton, {
      props: {
        ...this.$props,
        isDisabled: this.isDisabled,
        variantColor: this.isChecked ? 'red' : 'gray'
      },
      attrs: {
        ...this.$attrs,
        role: 'radio',
        'aria-checked': this.isChecked
      }
    }, this.$slots.default)
  }
}

storiesOf('UI | RadioGroup', module)
  .add('Basic Usage', () => ({
    components: { CFragment, CRadio, CRadioGroup },
    template: `
      <div>
        <CFragment>
          <CRadioGroup
            size="lg"
            defaultValue="male"
            ref="rg"
          >
          <CRadio variantColor="red" value="male">Male</CRadio>
          <CRadio variantColor="red" value="female">Female</CRadio>
        </CRadioGroup>
        </CFragment>
      </div>
    `
  }))
  .add('v-model', () => ({
    components: { CFragment, CRadio, CRadioGroup },
    template: `
      <div>
        <CFragment>
          <CRadioGroup
            size="lg"
            ref="rg"
            v-model="selected"
          >
          <CRadio variantColor="red" value="male">Male</CRadio>
          <CRadio variantColor="red" value="female">Female</CRadio>
        </CRadioGroup>
        </CFragment>
      </div>
    `,
    data () {
      return {
        selected: 'male'
      }
    },
    mounted () {
      setTimeout(() => {
        this.selected = 'female'
      }, 3000)
    },
    methods: {
      action () {
        action('@change(event)')
        console.log('changed', this.value)
      }
    }
  }))
  .add('Custom Radio Buttons', () => ({
    components: { CFragment, CustomRadio, CRadioButtonGroup },
    template: `
      <div>
        <CFragment>
          <CRadioButtonGroup
            v-model="selected"
            isInline
            :spacing="4"
          >
            <CustomRadio value="item-1" mx="2">Custom Radio 1</CustomRadio>
            <CustomRadio value="item-2" mx="2">Custom Radio 2</CustomRadio>
            <CustomRadio value="item-3" mx="2">Custom Radio 3</CustomRadio>
            <CustomRadio isDisabled value="item-4" mx="2">Custom Radio 4</CustomRadio>
        </CRadioButtonGroup>
        </CFragment>
      </div>
    `,
    data () {
      return {
        selected: 'item-2'
      }
    }
  }))
