<template>
  <Canvas>
    <div>
      <FormControl isRequired>
        <FormLabel for="fname">First name</FormLabel>
        <Input id="fname" v-model="inputValue" placeholder="First name" />
      </FormControl>
    </div>
  </Canvas>
</template>

<script lang="js">
import Canvas from './components/Canvas'
import {
  Input,
  FormControl,
  FormLabel } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Canvas,
    Input,
    FormControl,
    FormLabel
  },
  data () {
    return {
      inputValue: 'Default value'
    }
  },
  watch: {
    inputValue (newVal) {
      console.log(newVal)
    }
  }
}
</script>
