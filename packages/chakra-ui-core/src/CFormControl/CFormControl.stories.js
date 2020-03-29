import { storiesOf } from '@storybook/vue'
import { CInput, CFormControl, CFormLabel, CIcon, CStack, CInputGroup, CInputLeftElement, CInputRightElement, CFormHelperText, CFormErrorMessage } from '..'

storiesOf('UI | FormControl', module)
  .add('Basic Usage', () => ({
    components: { CInput, CFormControl, CFormLabel },
    template: `
      <CFormControl isRequired>
        <CFormLabel for="fname">First name</CFormLabel>
        <CInput id="fname" placeholder="First name" />
      </CFormControl>
    `
  }))
  .add('With Form Helper Text', () => ({
    components: { CInput, CFormControl, CStack, CIcon, CInputGroup, CInputLeftElement, CInputRightElement, CFormHelperText },
    template: `
      <div>
        <CFormControl id="test-error">
          <CInputGroup>
            <CInputLeftElement color="gray.300" fontSize="1.2em"><CIcon name="lock" /></CInputLeftElement>
            <CInput :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <CInputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><CIcon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></CInputRightElement>
          </CInputGroup>
          <CFormHelperText>Enter your password</CFormHelperText>
        </CFormControl>
      </div>
    `,
    data () {
      return {
        shouldShowPassword: false
      }
    }
  }))
  .add('With Form Validation Message', () => ({
    components: { CInput, CFormControl, CStack, CIcon, CInputGroup, CInputLeftElement, CInputRightElement, CFormErrorMessage },
    template: `
      <div>
        <CFormControl :isInvalid="value.length < 4" id="test-error">
          <CInputGroup>
            <CInputLeftElement color="gray.300" fontSize="1.2em"><CIcon name="lock" /></CInputLeftElement>
            <CInput v-model="value" :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <CInputRightElement @click.native="shouldShowPassword = !shouldShowPassword" ><CIcon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></CInputRightElement>
          </CInputGroup>
          <CFormErrorMessage v-show="value.length < 4" id="url-error">Your password is too short.</CFormErrorMessage>
        </CFormControl>
      </div>
    `,
    data () {
      return {
        shouldShowPassword: false,
        value: '123'
      }
    }
  }))
