import { storiesOf } from '@storybook/vue'
import { CInput, CFormControl, CFormLabel, CIcon, CStack, CInputGroup, CInputLeftElement, CInputRightElement, CFormHelperText, CFormErrorMessage } from '..'

storiesOf('UI | FormControl', module)
  .add('Basic Usage', () => ({
    components: { CInput, CFormControl, CFormLabel },
    template: `
      <CFormControl as="form" isRequired #default="props">
        <CFormLabel for="fname">First name</CFormLabel>
        <CInput focus-border-color="blue.200" id="fname" placeholder="First name" />
      </CFormControl>
    `
  }))
  .add('With Form Helper Text', () => ({
    components: { CInput, CFormControl, CStack, CIcon, CInputGroup, CInputLeftElement, CInputRightElement, CFormHelperText },
    template: `
      <div>
        <c-form-control id="test-error">
          <c-input-group>
            <c-input-left-element color="gray.300" fontSize="1.2em"><c-icon name="lock" /></c-input-left-element>
            <c-input v-model="pw" :type="shouldShowPassword ? 'text' : 'password'" placeholder="Password" />
            <c-input-right-element @click.native="shouldShowPassword = !shouldShowPassword" ><c-icon :name="shouldShowPassword ? 'eye-slash' : 'eye'" color="gray.500" /></c-input-right-element>
          </c-input-group>
          <c-form-helper-text>Enter your password</c-form-helper-text>
        </c-form-control>
      </div>
    `,
    data () {
      return {
        shouldShowPassword: false,
        pw: ''
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
