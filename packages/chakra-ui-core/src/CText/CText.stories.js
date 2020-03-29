import { storiesOf } from '@storybook/vue'
import { CText } from '..'

storiesOf('UI | Text', module)
  .add('Paragraph', () => ({
    components: { CText },
    template: `
      <div>
        <CText>Text Component</CText>
      </div>
    `
  }))
  .add('As underline', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="u">Underline</CText>
      </div>
    `
  }))
  .add('As abbreviation', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="abbr">I18N</CText>
      </div>
    `
  }))
  .add('As citation', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="cite">Citation</CText>
      </div>
    `
  }))
  .add('As deleted', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="del">Deleted</CText>
      </div>
    `
  }))
  .add('With emphasis', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="em">Emphasis</CText>
      </div>
    `
  }))
  .add('As inserted', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="ins">Inserted</CText>
      </div>
    `
  }))
  .add('As keyboard', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="kbd">Ctrl + C</CText>
      </div>
    `
  }))
  .add('As highlighted', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="mark">Highlighted</CText>
      </div>
    `
  }))
  .add('As strikethrough', () => ({
    components: { CText },
    template: `
      <div>
        <CText as="s">Strikethrough</CText>
      </div>
    `
  }))
  .add('As subscript', () => ({
    components: { CText },
    template: `
      <div>
        <CText d="inline-block">2</CText>
        <CText as="sub">sub</CText>
      </div>
    `
  }))
  .add('As superscript', () => ({
    components: { CText },
    template: `
      <div>
        <CText d="inline-block">5</CText>
        <CText as="sup">sup</CText>
      </div>
    `
  }))
