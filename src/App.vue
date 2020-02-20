<template>
  <Canvas>
    <div>
      <Fragment>
        <Radio value="male" defaultChecked name="bee">
          Male
        </Radio>
        <Radio ml="3" value="female" name="bee" defaultChecked>
          Female
        </Radio>
      </Fragment>
    </div>
  </Canvas>
</template>

<script lang="js">
import Canvas from './components/Canvas'
import {
  Fragment,
  Radio } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Canvas,
    Fragment,
    Radio
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
  }
}
</script>
