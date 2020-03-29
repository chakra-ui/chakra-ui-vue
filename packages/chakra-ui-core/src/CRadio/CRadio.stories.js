import { storiesOf } from '@storybook/vue'
import { CFragment, CRadio } from '..'

storiesOf('UI | Radio', module)
  .add('Basic Usage', () => ({
    components: { CFragment, CRadio },
    template: `
        <div>
          <CRadio value="male" defaultChecked name="bee">
            Male
          </CRadio>
          <CRadio ml="3" value="female" name="bee" defaultChecked>
            Female
          </CRadio>
        </div>
    `
  }))
