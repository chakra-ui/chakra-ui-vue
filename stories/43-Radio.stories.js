import { storiesOf } from '@storybook/vue'
import { Fragment, Radio } from '../packages/chakra-ui-core/src'

storiesOf('UI | Radio', module)
  .add('Basic Usage', () => ({
    components: { Fragment, Radio },
    template: `
        <div>
          <Radio value="male" defaultChecked name="bee">
            Male
          </Radio>
          <Radio ml="3" value="female" name="bee" defaultChecked>
            Female
          </Radio>
        </div>
    `
  }))
