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
        <FormControl isInvalid id="test-error">
          <InputGroup>
            <InputLeftElement color="gray.300" fontSize="1.2em"><Icon name="lock" /></InputLeftElement>
            <Input :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <InputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><Icon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></InputRightElement>
          </InputGroup>
          <FormHelperText>Add your website here</FormHelperText>
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
        <FormControl isInvalid id="test-error">
          <InputGroup>
            <InputLeftElement color="gray.300" fontSize="1.2em"><Icon name="lock" /></InputLeftElement>
            <Input :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <InputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><Icon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></InputRightElement>
          </InputGroup>
          <FormErrorMessage id="url-error">Website is invalid</FormErrorMessage>
        </FormControl>
      </div>
    `,
    data () {
      return {
        shouldShowPassword: false
      }
    }
  }))
