import { storiesOf } from '@storybook/vue'
import { CReset, CTooltip, CButton } from '..'

storiesOf('UI | Tooltip', module)
  .add('With custom separator', () => ({
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
