import { storiesOf } from '@storybook/vue'
import { Fragment, Button, Radio, RadioGroup, RadioButtonGroup } from '..'

const CustomRadio = {
  name: 'CustomRadio',
  props: {
    isChecked: Boolean,
    isDisabled: Boolean,
    value: [String, Number],
    mx: String
  },
  render (h) {
    return h(Button, {
      props: {
        ...this.$props,
        isDisabled: this.isDisabled,
        variantColor: this.isChecked ? 'red' : 'gray'
      },
      attrs: {
        role: 'radio',
        'aria-checked': this.isChecked
      }
    }, this.$slots.default)
  }
}

storiesOf('UI | RadioGroup', module)
  .add('Basic Usage', () => ({
    components: { Fragment, Radio, RadioGroup },
    template: `
      <div>
        <Fragment>
          <RadioGroup
            size="lg"
            defaultValue="male"
            ref="rg"
          >
          <Radio variantColor="red" value="male">Male</Radio>
          <Radio variantColor="red" value="female">Female</Radio>
        </RadioGroup>
        </Fragment>
      </div>
    `
  }))
  .add('Custom Radio Buttons', () => ({
    components: { Fragment, CustomRadio, RadioButtonGroup },
    template: `
      <div>
        <Fragment>
          <RadioButtonGroup
            defaultValue="item-2"
            isInline
            :spacing="4"
          >
            <CustomRadio value="item-1" mx="2">Custom Radio 1</CustomRadio>
            <CustomRadio value="item-2" mx="2">Custom Radio 2</CustomRadio>
            <CustomRadio value="item-3" mx="2">Custom Radio 3</CustomRadio>
            <CustomRadio isDisabled value="item-4" mx="2">Custom Radio 4</CustomRadio>
        </RadioButtonGroup>
        </Fragment>
      </div>
    `
  }))
