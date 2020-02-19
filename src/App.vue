<template>
  <Canvas>
    <div>
      <Stack spacing="4" fontFamily="body" width="300px">
        <Heading as="h3">Login</Heading>
        <InputGroup>
          <InputLeftElement><Icon name="envelope" color="gray.300" /></InputLeftElement>
          <Input type="email" placeholder="Email" />
        </InputGroup>

        <FormControl isInvalid id="test-error">
          <InputGroup>
            <InputLeftElement color="gray.300" fontSize="1.2em"><Icon name="lock" /></InputLeftElement>
            <Input :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <InputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><Icon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></InputRightElement>
          </InputGroup>
          <FormErrorMessage id="url-error">Website is invalid</FormErrorMessage>
        </FormControl>
        <Button @click="showToast" left-icon="sign-in-alt" variantColor="blue">Login</Button>
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
  Heading,
  useToast,
  FormControl,
  FormErrorMessage } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  inject: ['$theme', '$colorMode'],
  components: {
    Canvas,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Icon,
    Stack,
    Button,
    Heading,
    FormControl,
    FormErrorMessage
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
  mounted () {
    this.toast = useToast({ theme: this.theme, icons: this.$kiwi.icons, colorMode: this.colorMode })
  },
  methods: {
    showToast () {
      return this.toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'info',
        duration: 20000,
        isClosable: true
      })
    }
  },
  watch: {
    inputValue (newVal) {
      console.log(newVal)
    }
  }
}
</script>
