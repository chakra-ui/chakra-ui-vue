import { storiesOf } from '@storybook/vue'
import { CImage } from '..'

storiesOf('UI | Image', module)
  .add('Basic Usage', () => ({
    components: { CImage },
    template: `
      <CImage
        shadow="sm"
        htmlWidth="100px"
        src="https://bit.ly/chakra-jonathan-bakebw3a"
        srcset="https://bit.ly/chakra-jonathan-bakebwa"
      />
    `
  }))
  .add('Webpack required image', () => ({
    components: { CImage },
    template: `
      <CImage
        shadow="sm"
        htmlWidth="100px"
        :src="require('@/assets/chakra.png')"
      />
    `
  }))
  .add('With size', () => ({
    components: { CImage },
    template: `
      <CImage
        rounded="full"
        size="150px"
        shadow="md"
        src="https://bit.ly/chakra-jonathan-bakebwa"
        alt="Jonathan Bakebwa"
      />
    `
  }))
  .add('With fallback src', () => ({
    components: { CImage },
    template: `
      <CImage
        src="gibberish.png"
        fallback-src="https://via.placeholder.com/150"
      />
    `
  }))
