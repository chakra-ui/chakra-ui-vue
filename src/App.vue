<template>
  <Canvas>
    <div>
      <Stack spacing="4" fontFamily="body" width="300px">
        <Heading as="h3">Login</Heading>
        <InputGroup>
          <InputLeftElement><Icon name="envelope" color="gray.300" /></InputLeftElement>
          <Input type="email" placeholder="email@example.com" />
        </InputGroup>

        <InputGroup>
          <InputLeftElement color="gray.300" fontSize="1.2em"><Icon name="lock" /></InputLeftElement>
          <Input :type="shouldShowPassword ? 'text' : 'password'" placeholder="Enter amount" />
          <InputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><Icon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></InputRightElement>
        </InputGroup>

        <Button left-icon="sign-in-alt" variantColor="blue">Login</Button>
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
  Icon,
  Stack,
  Button,
  Heading } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Canvas,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Icon,
    Stack,
    Button,
    Heading
  },
  data () {
    return {
      inputValue: 'Default value',
      shouldShowPassword: false
    }
  },
  watch: {
    inputValue (newVal) {
      console.log(newVal)
    }
  }
}
</script>
