import { storiesOf } from '@storybook/vue'
import { Text as KText } from '../packages/kiwi-core/src'

storiesOf('UI | Text', module)
  .add('Paragraph', () => ({
    components: { KText },
    template: `
      <div>
        <KText>Text Component</KText>
      </div>
    `
  }))
  .add('As underline', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="u">Underline</KText>
      </div>
    `
  }))
  .add('As abbreviation', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="abbr">I18N</KText>
      </div>
    `
  }))
  .add('As citation', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="cite">Citation</KText>
      </div>
    `
  }))
  .add('As deleted', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="del">Deleted</KText>
      </div>
    `
  }))
  .add('With emphasis', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="em">Emphasis</KText>
      </div>
    `
  }))
  .add('As inserted', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="ins">Inserted</KText>
      </div>
    `
  }))
  .add('As keyboard', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="kbd">Ctrl + C</KText>
      </div>
    `
  }))
  .add('As highlighted', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="mark">Highlighted</KText>
      </div>
    `
  }))
  .add('As strikethrough', () => ({
    components: { KText },
    template: `
      <div>
        <KText as="s">Strikethrough</KText>
      </div>
    `
  }))
  .add('As subscript', () => ({
    components: { KText },
    template: `
      <div>
        <KText d="inline-block">2</KText>
        <KText as="sub">sub</KText>
      </div>
    `
  }))
  .add('As superscript', () => ({
    components: { KText },
    template: `
      <div>
        <KText d="inline-block">5</KText>
        <KText as="sup">sup</KText>
      </div>
    `
  }))
