import { storiesOf } from '@storybook/vue'
import { CIcon } from '..'

storiesOf('UI | Icon', module)
  .add('Base Icon', () => ({
    components: { CIcon },
    template: `
      <div>
        <CIcon name="star" mx="2" color="yellow.400" size="4" />
        <CIcon name="email" mx="2" color="indigo.400" size="5" />
        <CIcon name="phone" mx="2" color="green.400" size="6" />
        <CIcon name="anchor" mx="2" color="red.400" size="10" />
      </div>
    `
  }))
  .add('Custom Icon eg FA', () => ({
    components: { CIcon },
    template: `
      <div>
        <CIcon name="ambulance" color="blue.400" size="10" />
      </div>
    `
  }))
