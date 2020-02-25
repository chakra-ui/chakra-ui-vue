<template>
  <Canvas>
    <div>
      <Fragment>
        <RadioButtonGroup
          defaultValue="item-2"
          @change="handleChange"
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
  </Canvas>
</template>

<script lang="js">
import Canvas from './components/Canvas'
import {
  Fragment,
  Button,
  RadioButtonGroup } from '../packages/kiwi-core/dist/esm'

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

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Canvas,
    Fragment,
    RadioButtonGroup,
    CustomRadio
  },
  data () {
    return {
      inputValue: 'Default value',
      shouldShowPassword: false
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    }
  },
  watch: {
    inputValue (newVal) {
      console.log(newVal)
    }
  },

  methods: {
    handleChange: (value) => console.log(value),
    focusRadioGroup () {
      this.$refs.rg.focus()
    }
  }
}
</script>
