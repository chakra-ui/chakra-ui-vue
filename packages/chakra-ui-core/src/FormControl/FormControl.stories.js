import { storiesOf } from '@storybook/vue'
import { Input, FormControl, FormLabel, Icon, Stack, InputGroup, InputLeftElement, InputRightElement, FormHelperText, FormErrorMessage } from '..'

storiesOf('UI | FormControl', module)
  .add('Basic Usage', () => ({
    components: { Input, FormControl, FormLabel },
    template: `
      <FormControl isRequired>
        <FormLabel for="fname">First name</FormLabel>
        <Input id="fname" placeholder="First name" />
      </FormControl>
    `
  }))
  .add('With Form Helper Text', () => ({
    components: { Input, FormControl, Stack, Icon, InputGroup, InputLeftElement, InputRightElement, FormHelperText },
    template: `
      <div>
        <FormControl id="test-error">
          <InputGroup>
            <InputLeftElement color="gray.300" fontSize="1.2em"><Icon name="lock" /></InputLeftElement>
            <Input :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <InputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><Icon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></InputRightElement>
          </InputGroup>
          <FormHelperText>Enter your password</FormHelperText>
        </FormControl>
      </div>
    `,
    data () {
      return {
        shouldShowPassword: false
      }
    }
  }))
  .add('With Form Validation Message', () => ({
    components: { Input, FormControl, Stack, Icon, InputGroup, InputLeftElement, InputRightElement, FormErrorMessage },
    template: `
      <div>
        <FormControl :isInvalid="value.length < 4" id="test-error">
          <InputGroup>
            <InputLeftElement color="gray.300" fontSize="1.2em"><Icon name="lock" /></InputLeftElement>
            <Input v-model="value" :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <InputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><Icon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></InputRightElement>
          </InputGroup>
          <FormErrorMessage v-show="value.length < 4" id="url-error">Your password is too short.</FormErrorMessage>
        </FormControl>
      </div>
    `,
    data () {
      return {
        shouldShowPassword: false,
        value: '123'
      }
    }
  }))
