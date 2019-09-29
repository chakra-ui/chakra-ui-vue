import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'
import Button from '../src/components/Button/index.vue'

storiesOf('Button', module)
  .addDecorator(centered)
  .add('Colors', () => ({
    components: { Button },
    template: `
      <div>
        <div>
          <h2>Primary</h2>
          <Button @click="action">Solid</Button>
          <Button variant="outlined" @click="action">Outlined</Button>
          <Button variant="ghost" @click="action">Ghost</Button>
          <Button variant="flat" @click="action">Flat</Button>
          <Button variant="link" @click="action">Link</Button>
        </div>
        <div>
          <h2>Secondary</h2>
          <Button color="secondary" @click="action">Solid</Button>
          <Button color="secondary" variant="outlined" @click="action">Outlined</Button>
          <Button color="secondary" variant="ghost" @click="action">Ghost</Button>
          <Button color="secondary" variant="flat" @click="action">Flat</Button>
          <Button color="secondary" variant="link" @click="action">Link</Button>
        </div>
        <div>
          <h2>Success</h2>
          <Button color="success" @click="action">Solid</Button>
          <Button color="success" variant="outlined" @click="action">Outlined</Button>
          <Button color="success" variant="ghost" @click="action">Ghost</Button>
          <Button color="success" variant="flat" @click="action">Flat</Button>
          <Button color="success" variant="link" @click="action">Link</Button>
        </div>
        <div>
          <h2>Warning</h2>
          <Button color="warning" @click="action">Solid</Button>
          <Button color="warning" variant="outlined" @click="action">Outlined</Button>
          <Button color="warning" variant="ghost" @click="action">Ghost</Button>
          <Button color="warning" variant="flat" @click="action">Flat</Button>
          <Button color="warning" variant="link" @click="action">Link</Button>
        </div>
        <div>
          <h2>Danger</h2>
          <Button color="danger" @click="action">Solid</Button>
          <Button color="danger" variant="outlined" @click="action">Outlined</Button>
          <Button color="danger" variant="ghost" @click="action">Ghost</Button>
          <Button color="danger" variant="flat" @click="action">Flat</Button>
          <Button color="danger" variant="link" @click="action">Link</Button>
        </div>
        <div>
          <h2>Dark</h2>
          <Button color="dark" @click="action">Solid</Button>
          <Button color="dark" variant="outlined" @click="action">Outlined</Button>
          <Button color="dark" variant="ghost" @click="action">Ghost</Button>
          <Button color="dark" variant="flat" @click="action">Flat</Button>
          <Button color="dark" variant="link" @click="action">Link</Button>
        </div>
      </div>
    `,
    methods: { action: action('clicked') }
  }))
