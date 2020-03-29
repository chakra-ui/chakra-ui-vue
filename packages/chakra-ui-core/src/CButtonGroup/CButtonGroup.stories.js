import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { CButton, CButtonGroup } from '..'

storiesOf('UI | ButtonGroup', module)
  .add('Button Group', () => ({
    components: { CButton, CButtonGroup },
    template: `
      <div>
      <CButtonGroup variant-color="blue" is-attached>
        <CButton variant="outline">Button 1</CButton>
        <CButton>Button 2</CButton>
        <CButton variant="outline">Button 3</CButton>
      </CButtonGroup>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
