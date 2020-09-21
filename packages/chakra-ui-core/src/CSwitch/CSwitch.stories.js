import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { CBox, CSwitch } from '..'

storiesOf('UI | Switch', module)
  .add('Basic Usage', () => ({
    components: { CBox, CSwitch },
    template: `
      <CBox mb="3">
        <CSwitch
          size="sm"
          @change="action"
          color="green"
          mr="3"
        />
        <CSwitch
          size="md"
          @change="action"
          color="blue"
          mr="3"
        />
        <CSwitch
          size="lg"
          @change="action"
          color="cyan"
        />
      </CBox>
    `,
    methods: { action: action('@change(event)') }
  }))
  .add('With v-model', () => ({
    components: { CBox, CSwitch },
    data: () => ({
      enable: false
    }),
    template: `
    <div>
      <span>{{enable ? 'enabled' : 'disabled'}}</span>
      <CSwitch v-model="enable" />
    </div>`,
    methods: {
      action () {
        action('@change(event)')
      }
    }
  }))
  .add('With v-model + @change', () => ({
    components: { CBox, CSwitch },
    data: () => ({
      enable: false
    }),
    template: `
      <p>
        <span>{{enable}}</span>
        <c-switch v-model="enable" id="email-alerts" @change="action"/>
      </p>`,
    methods: {
      action: action('@change(event) + v-model'),
      handleClick (e) {
        console.log('Native event handler', e)
      }
    }
  }))
