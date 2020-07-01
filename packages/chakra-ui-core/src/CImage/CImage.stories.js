import { storiesOf } from '@storybook/vue'
import { CImage } from '..'

storiesOf('UI | Image', module)
  .add('Basic Usage', () => ({
    components: { CImage },
    template: `
      <CImage
        shadow="sm"
        htmlWidth="100px"
        src="https://avatars3.githubusercontent.com/u/37928?s=52&v=4"
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
