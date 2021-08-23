import { storiesOf } from '@storybook/vue'
import { CReset, CGrid, CGridItem, CBox } from '..'

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

storiesOf('UI | Grid', module)
  .add('Grid Items', () => ({
    components: { CReset, CGrid, CGridItem },
    template: `
      <div>
        <CReset />
        <CGrid w="600px" template-columns="repeat(5, 1fr)" gap="6">
          <CGridItem col-span="2" h="10" bg="blue.500" />
          <CGridItem col-start="4" col-end="6" h="10" bg="red.500" />
        </CGrid>
      </div>
    `
  }))
