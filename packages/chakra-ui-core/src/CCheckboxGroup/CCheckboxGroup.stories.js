import { storiesOf } from '@storybook/vue'
import { CBox, CCheckbox, CCheckboxGroup } from '..'

storiesOf('UI | CheckboxGroup', module)
  .add('Basic Usage', () => ({
    components: { CBox, CCheckbox, CCheckboxGroup },
    template: `
      <CBox w="300px">
        <CCheckboxGroup v-model="selectedValues" variantColor="green" :defaultValue="['two']">
          <CCheckbox value="one">One</CCheckbox>
          <CCheckbox value="two">Two</CCheckbox>
          <CCheckbox value="three">Three</CCheckbox>
        </CCheckboxGroup>
      </CBox>
    `,
    data () {
      return {
        selectedValues: ['two']
      }
    }
  }))
