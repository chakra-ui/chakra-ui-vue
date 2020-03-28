import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'
import { CButton } from '..'

storiesOf('UI | Button', module)
  .add('Unstyled', () => ({
    components: { CButton },
    template: `
      <div>
        <CButton @click="action">Solid</CButton>
        <CButton variant="outline" @click="action">Outlined</CButton>
        <CButton variant="ghost" @click="action">Ghost</CButton>
        <CButton variant="flat" @click="action">Flat</CButton>
        <CButton variant="link" @click="action">Link</CButton>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Variant Colors | Blue', () => ({
    components: { CButton },
    template: `
      <div>
        <CButton @click="action" variant-color="blue">Solid</CButton>
        <CButton variant="outline" variant-color="blue" @click="action">Outlined</CButton>
        <CButton variant="ghost" variant-color="blue" @click="action">Ghost</CButton>
        <CButton variant="flat" variant-color="blue" @click="action">Flat</CButton>
        <CButton variant="link" variant-color="blue" @click="action">Link</CButton>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Sizes', () => ({
    components: { CButton },
    template: `
      <div>
        <CButton @click="action" variant-color="blue" size="lg">Large</CButton>
        <CButton variant-color="blue" size="md" @click="action">Medium</CButton>
        <CButton variant-color="blue" size="sm" @click="action">Small</CButton>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('Rounded', () => ({
    components: { CButton },
    template: `
      <div>
        <CButton @click="action" rounded="none" variant-color="indigo">No rounded</CButton>
        <CButton @click="action" rounded="sm" variant-color="indigo">Small rounded</CButton>
        <CButton @click="action" rounded="md" variant-color="indigo">Medium rounded</CButton>
        <CButton @click="action" rounded="lg" variant-color="indigo">Large rounded</CButton>
        <CButton @click="action" rounded="full" variant-color="indigo">Full rounded</CButton>
      </div>
    `,
    methods: { action: action('Button Clicked') }
  }))
  .add('With Loading', () => ({
    components: { CButton },
    template: `
      <div>
        <CButton :variant-color="variantColor" @click="setLoading" :is-loading="loading"> {{ buttonText }} </CButton>
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
    components: { CButton },
    template: `
      <div>
        <CButton :variant-color="variantColor" left-icon="star" @click="setLoading" :is-loading="loading"> {{ buttonText }} </CButton>
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
    components: { CButton },
    template: `
      <div>
        <CButton :variant-color="variantColor" right-icon="email" @click="setLoading" :is-loading="loading"> {{ buttonText }} </CButton>
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
