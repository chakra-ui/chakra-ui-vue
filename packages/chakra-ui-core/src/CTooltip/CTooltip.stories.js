import { storiesOf } from '@storybook/vue'
import { CReset, CTooltip, CText, CButton, CLink } from '..'

storiesOf('UI | Tooltip', module)
  .add('With text element', () => ({
    components: { CReset, CText, CTooltip, CLink },
    template: `
      <div>
        <c-text>Hello World!
          <c-tooltip label="Jonathan Bakebwa 💚Vue">
            <c-link text-decoration="underline" href="https://twitter.com/codebender828" target="_blank">@codebender828</c-link>
          </c-tooltip>
          will be joining us today!
        </c-text>
      </div>
    `
  }))
  .add('With custom focusable element', () => ({
    components: { CReset, CTooltip, CButton },
    template: `
      <div>
        <CReset />
        <CTooltip label="Aborts requests for display">
          <CButton left-icon="user-slash" w="400px" variant-color="red">Delete Account</CButton>
        </CTooltip>
      </div>
    `
  }))
