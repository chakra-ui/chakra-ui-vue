import { storiesOf } from '@storybook/vue'
import { CReset, CCode, CStack } from '..'

storiesOf('UI | Code', module)
  .add('Default Code', () => ({
    components: { CReset, CCode },
    template: `
      <div>
        <CReset />
        <CCode>Hello world</CCode>
      </div>
    `
  }))
  .add('With variant color', () => ({
    components: { CReset, CCode, CStack },
    template: `
      <div>
        <CReset />
        <CStack isInline>
          <CCode>console.log(welcome)</CCode>
          <CCode variantColor="red" mx="2">var chakra = 'awesome!'</CCode>
          <CCode variantColor="yellow" >npm install chakra</CCode>
        </CStack>
      </div>
    `
  }))
