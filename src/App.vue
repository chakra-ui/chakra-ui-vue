<template>
  <Canvas>
    <div>
      <Fragment>
        <Button @click="focusRadioGroup">
          Focus RadioGroup
        </Button>
        <RadioGroup
          size="lg"
          defaultValue="male"
          @change="handleChange"
          ref="rg"
        >
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
      </RadioGroup>
      </Fragment>
    </div>
  </Canvas>
</template>

<script lang="js">
import Canvas from './components/Canvas'
import {
  Fragment,
  Radio,
  RadioGroup,
  Button } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Canvas,
    Fragment,
    Radio,
    RadioGroup,
    Button
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
