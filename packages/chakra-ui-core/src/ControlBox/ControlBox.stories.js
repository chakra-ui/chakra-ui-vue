import { storiesOf } from '@storybook/vue'
import { VisuallyHidden, ControlBox, Box, Icon } from '..'

storiesOf('UI | ControlBox', module)
  .add('With checkbox', () => ({
    components: { VisuallyHidden, ControlBox, Box, Icon },
    template: `
    <Box as="label" display="flex" alignItems="center" cursor="pointer" for="control-checkbox">
      <!-- This is the sibling input, it's visually hidden -->
      <VisuallyHidden as="input" id="control-checkbox" type="checkbox" checked="true" />

      <!-- This is the control box with a check icon as children -->
      <ControlBox
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
        <Icon name="check" size="16px" />
      </ControlBox>

      <!-- You can pass additional text -->
      <Box ml="2" as="span" vertical-align="center" user-select="none">
        Checkbox Label
      </Box>
    </Box>
    `
  }))
  .add('With radio', () => ({
    components: { VisuallyHidden, ControlBox, Box, Icon },
    template: `
      <Box as="label" display="flex" border-color="gray.200" align-items="center" cursor="pointer" for="control-radio">
        <!-- This is the sibling input, it's visually hidden -->
        <VisuallyHidden as="input" id="control-radio" type="radio" />

        <!-- This is the control box with a check icon as children -->
        <ControlBox
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
          <Box w="50%" h="50%" bg="white" rounded="full" />
        </ControlBox>

        <!-- You can pass additional text -->
        <Box as="span" ml="2" vertical-align="center" user-select="none">
          This is a Radio
        </Box>
      </Box>
    `
  }))
