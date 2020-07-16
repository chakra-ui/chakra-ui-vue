import { storiesOf } from '@storybook/vue'
import { CVisuallyHidden, CControlBox, CBox, CIcon } from '..'

storiesOf('UI | ControlBox', module)
  .add('With checkbox', () => ({
    components: { CVisuallyHidden, CControlBox, CBox, CIcon },
    template: `
    <CBox as="label" display="flex" alignItems="center" cursor="pointer" for="control-checkbox">
      <!-- This is the sibling input, it's visually hidden -->
      <CVisuallyHidden as="input" id="control-checkbox" type="checkbox" checked="true" />

      <!-- This is the control box with a check icon as children -->
      <CControlBox
        borderWidth="1px"
        size="24px"
        rounded="sm"
        :_checked="{
          bg: 'green.500',
          color: 'white',
          borderColor: 'green.500'
        }"
        :_focus="{
          borderColor: 'green.600',
          boxShadow: 'outline'
        }"
      >
        <CIcon name="check" size="16px" />
      </CControlBox>

      <!-- You can pass additional text -->
      <CBox ml="2" as="span" vertical-align="center" user-select="none">
        Checkbox Label
      </CBox>
    </CBox>
    `
  }))
  .add('With radio', () => ({
    components: { CVisuallyHidden, CControlBox, CBox, CIcon },
    template: `
      <CBox as="label" display="flex" border-color="gray.200" align-items="center" cursor="pointer" for="control-radio">
        <!-- This is the sibling input, it's visually hidden -->
        <CVisuallyHidden as="input" id="control-radio" type="radio" />

        <!-- This is the control box with a check icon as children -->
        <CControlBox
          size="24px"
          border="2px"
          bg="white"
          rounded="full"
          type="radio"
          border-color="inherit"
          :_checked="{
            bg: 'green.500',
            borderColor: 'green.500'
          }"
          :_hover="{ borderColor: 'gray.300' }"
          :_focus="{ boxShadow: 'outline' }"
          :_disabled="{ opacity: '40%' }"
        >
          <CBox w="50%" h="50%" bg="white" rounded="full" />
        </CControlBox>

        <!-- You can pass additional text -->
        <CBox as="span" ml="2" vertical-align="center" user-select="none">
          This is a Radio
        </CBox>
      </CBox>
    `
  }))
  .add('Functional control box', () => ({
    components: { CControlBox, CVisuallyHidden, CBox, CIcon },
    template: `
      <CBox as="label" display="flex" alignItems="center" cursor="pointer" for="control-checkbox">
        <!-- This is the sibling input, it's visually hidden -->
        <CVisuallyHidden as="input" @change.native="handleChange" id="control-checkbox" type="checkbox" checked="true" />

        <!-- This is the control box with a check icon as children -->
        <CControlBox
          borderWidth="1px"
          size="24px"
          rounded="sm"
          :_checked="{
            bg: 'green.500',
            color: 'white',
            borderColor: 'green.500'
          }"
          :_focus="{
            borderColor: 'green.600',
            boxShadow: 'outline'
          }"
        >
          <CIcon name="check" size="16px" />
        </CControlBox>

        <!-- You can pass additional text -->
        <CBox ml="2" as="span" vertical-align="center" user-select="none">
          Checkbox Label
        </CBox>
      </CBox>
    `,
    methods: {
      handleChange (e) {
        console.log('changed', e)
      }
    }
  }))
