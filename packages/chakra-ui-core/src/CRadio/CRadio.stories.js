import { storiesOf } from '@storybook/vue'
import { CFragment, CRadio } from '..'

storiesOf('UI | Radio', module)
  .add('Basic Usage', () => ({
    components: { CFragment, CRadio },
    template: `
        <div>
          <CRadio value="male" v-model="maleChecked" defaultIsChecked name="bee">
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
    },
  }))
