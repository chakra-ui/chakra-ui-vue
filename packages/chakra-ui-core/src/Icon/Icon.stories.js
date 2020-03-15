import { storiesOf } from '@storybook/vue'
import { Icon } from '..'

storiesOf('UI | Icon', module)
  .add('Base Icon', () => ({
    components: { Icon },
    template: `
      <div>
        <Icon name="star" mx="2" color="yellow.400" size="4" />
        <Icon name="email" mx="2" color="indigo.400" size="5" />
        <Icon name="phone" mx="2" color="green.400" size="6" />
        <Icon name="anchor" mx="2" color="red.400" size="10" />
      </div>
    `
  }))
  .add('Custom Icon eg FA', () => ({
    components: { Icon },
    template: `
      <div>
        <Icon name="ambulance" color="blue.400" size="10" />
      </div>
    `
  }))
