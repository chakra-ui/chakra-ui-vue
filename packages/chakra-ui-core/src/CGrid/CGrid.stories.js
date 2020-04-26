import { storiesOf } from '@storybook/vue'
import { CReset, CGrid, CBox } from '..'

storiesOf('UI | Grid', module)
  .add('Default Grid', () => ({
    components: { CReset, CGrid, CBox },
    template: `
      <div>
        <CReset />
        <CGrid as="section" w="600px" template-columns="repeat(5, 1fr)" gap="6">
          <CBox w="100%" h="10" bg="blue.500" />
          <CBox w="100%" h="10" bg="blue.500" />
          <CBox w="100%" h="10" bg="blue.500" />
          <CBox w="100%" h="10" bg="blue.500" />
          <CBox w="100%" h="10" bg="blue.500" />
        </CGrid>
      </div>
    `
  }))
