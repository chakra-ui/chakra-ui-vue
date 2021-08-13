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
  .add('isTruncated', () => ({
    components: { CText },
    template: `
      <div style="width: 80vw">
        <CText isTruncated>Extra super duper long naruto heading in the village hidden in the leaves by the first Hokage who used to be friedns with Madara Uchiha but they went their separate ways because they could find a common understing around the definition of peace in the ninja world.t</CText>
      </div>
    `
  }))
  .add('with noOfLines', () => ({
    components: { CText },
    template: `
      <div style="width: 80vw">
        <div>This will not show more than 3 lines</div>
        <CText noOfLines="3" mb="2" borderWidth="1px" borderColor="red.200">
          Extra super duper long naruto heading in the village hidden in the leaves by the first Hokage who used to be friedns with Madara Uchiha but they went their separate ways because they could find a common understing around the definition of peace in the ninja world. Add text to make it long enough
        </CText>
      </div>
    `
  }))
  .add('with textDecor', () => ({
    components: { CText },
    template: `
      <div style="width: 80vw; padding-top: 20px;">
        <div>Some decorations:</div>
        <CText p="4" mb="2" borderWidth="1px" borderColor="red.200" textDecor="overline">
          Extra super duper long naruto heading in the village hidden in the leaves by the first Hokage who used to be friedns with Madara Uchiha but they went their separate ways because they could find a common understing around the definition of peace in the ninja world.
        </CText>
        <CText p="4" mb="2" borderWidth="1px" borderColor="blue.200" textDecor="line-through">
          Extra super duper long naruto heading in the village hidden in the leaves by the first Hokage who used to be friedns with Madara Uchiha but they went their separate ways because they could find a common understing around the definition of peace in the ninja world.
        </CText>
        <CText p="4" mb="2" borderWidth="1px" borderColor="green.200" textDecor="underline">
          Extra super duper long naruto heading in the village hidden in the leaves by the first Hokage who used to be friedns with Madara Uchiha but they went their separate ways because they could find a common understing around the definition of peace in the ninja world.
        </CText>
      </div>
    `
  }))
