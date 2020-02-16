<template>
  <Canvas>
    <div>
      <Stack spacing="4">
        <InputGroup>
          <InputLeftElement><Icon name="phone" color="gray.300" /></InputLeftElement>
          <Input type="phone" placeholder="Phone number" />
        </InputGroup>

        <InputGroup>
          <InputLeftElement color="gray.300" fontSize="1.2em" >$</InputLeftElement>
          <Input placeholder="Enter amount" />
          <InputRightElement><Icon name="check" color="green.500" /></InputRightElement>
        </InputGroup>

        <InputGroup>
          <InputLeftAddon>+256</InputLeftAddon>
          <Input type="tel" roundedLeft="0" placeholder="phone number" />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon>https://</InputLeftAddon>
          <Input rounded="0" placeholder="mysite" />
          <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
      </Stack>
    </div>
  </Canvas>
</template>

<script lang="js">
import Canvas from './components/Canvas'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputLeftAddon,
  InputRightAddon,
  Icon,
  Stack } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Canvas,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    InputLeftAddon,
    InputRightAddon,
    Icon,
    Stack
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
