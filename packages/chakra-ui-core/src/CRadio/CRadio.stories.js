import { storiesOf } from '@storybook/vue'
import { CFragment, CRadio, CStack, CRadioGroup } from '..'

storiesOf('UI | Radio', module)
  .add('Basic Usage', () => ({
    components: { CFragment, CRadio },
    template: `
        <div>
          <CRadio value="male" v-model="maleChecked" name="bee">
            Male
          </CRadio>
          <CRadio ml="3" value="female" name="bee">
            Female
          </CRadio>
        </div>
    `,
    data () {
      return {
        maleChecked: true
      }
    }
  }))
  .add('with v-model', () => ({
    components: { CFragment, CRadioGroup, CRadio, CStack },
    template: `
      <c-radio-group v-model="selected">
        <c-radio size="sm" value="sm" name="1" variant-color="red">
          Radio
        </c-radio>
        <c-radio size="md" value="md" name="1" variant-color="green">
          Radio
        </c-radio>
        <c-radio size="lg" value="lg" name="1" variant-color="orange" default-is-checked>
          Radio
        </c-radio>
      </c-radio-group>
    `,
    data () {
      return {
        selected: 'md'
      }
    }
  }))
  .add('default is checked', () => ({
    components: { CFragment, CRadioGroup, CRadio, CStack },
    template: `
      <c-stack spacing="10" is-inline>
        <c-radio-group :spacing="4" v-model="vertical">
          <c-radio size="sm" value="sm" name="1" variant-color="red">
            Radio
          </c-radio>
          <c-radio size="md" value="md" name="1" variant-color="green">
            Radio
          </c-radio>
          <c-radio size="lg" value="lg" name="1" variant-color="orange" default-is-checked>
            Radio
          </c-radio>
        </c-radio-group>

        <c-radio-group :spacing="4" v-model="horizontal" is-inline>
          <c-radio size="sm" value="sm-2" name="1" variant-color="red">
            Radio
          </c-radio>
          <c-radio size="md" value="md-2" name="1" variant-color="green">
            Radio
          </c-radio>
          <c-radio size="lg" value="lg-2" name="1" variant-color="orange" default-is-checked>
            Radio
          </c-radio>
        </c-radio-group>
      </c-stack>
    `,
    data () {
      return {
        vertical: 'md',
        horizontal: 'lg-2'
      }
    }
  }))
