import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { Button } from '../packages/kiwi-core/src'

storiesOf('UI | Button', module)
  .add('Unstyled', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action">Solid</Button>
        <Button variant="outline" @click="action">Outlined</Button>
        <Button variant="ghost" @click="action">Ghost</Button>
        <Button variant="flat" @click="action">Flat</Button>
        <Button variant="link" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Variant Colors | Blue', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action" variant-color="blue">Solid</Button>
        <Button variant="outline" variant-color="blue" @click="action">Outlined</Button>
        <Button variant="ghost" variant-color="blue" @click="action">Ghost</Button>
        <Button variant="flat" variant-color="blue" @click="action">Flat</Button>
        <Button variant="link" variant-color="blue" @click="action">Link</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Sizes', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action" variant-color="blue" size="lg">Large</Button>
        <Button variant-color="blue" size="md" @click="action">Medium</Button>
        <Button variant-color="blue" size="sm" @click="action">Small</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Rounded', () => ({
    components: { Button },
    template: `
      <div>
        <Button @click="action" rounded="none" variant-color="indigo">No rounded</Button>
        <Button @click="action" rounded="sm" variant-color="indigo">Small rounded</Button>
        <Button @click="action" rounded="md" variant-color="indigo">Medium rounded</Button>
        <Button @click="action" rounded="lg" variant-color="indigo">Large rounded</Button>
        <Button @click="action" rounded="full" variant-color="indigo">Full rounded</Button>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('With Loading', () => ({
    components: { Button },
    template: `
      <div>
        <Button :variant-color="variantColor" @click="setLoading" :is-loading="loading"> {{ buttonText }} </Button>
      </div>
    `,
    data () {
      return {
        loading: false,
        buttonText: 'Save settings',
        variantColor: 'blue'
      }
    },
    methods: {
      setLoading () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.buttonText = 'Success'
          this.variantColor = 'green'
        }, 1500)
      }
    }
  }))
  .add('With Icon | Left', () => ({
    components: { Button },
    template: `
      <div>
        <Button :variant-color="variantColor" left-icon="star" @click="setLoading" :is-loading="loading"> {{ buttonText }} </Button>
      </div>
    `,
    data () {
      return {
        loading: false,
        buttonText: 'Favourite',
        variantColor: 'indigo'
      }
    },
    methods: {
      setLoading () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.buttonText = 'Success'
          this.variantColor = 'green'
        }, 1500)
      }
    }
  }))
  .add('With Icon | Right', () => ({
    components: { Button },
    template: `
      <div>
        <Button :variant-color="variantColor" right-icon="email" @click="setLoading" :is-loading="loading"> {{ buttonText }} </Button>
      </div>
    `,
    data () {
      return {
        loading: false,
        buttonText: 'Send',
        variantColor: 'blue'
      }
    },
    methods: {
      setLoading () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.buttonText = 'Sent'
          this.variantColor = 'green'
        }, 1500)
      }
    }
  }))
