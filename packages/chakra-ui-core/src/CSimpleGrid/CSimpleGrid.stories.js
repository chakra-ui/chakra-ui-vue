import { storiesOf } from '@storybook/vue'
import { CSimpleGrid, CBox } from '..'

storiesOf('UI | Simple Grid component', module)
  .add('Basic Usage', () => ({
    components: { CSimpleGrid, CBox },
    template: `
    <c-box w="80vw">
      <c-simple-grid :columns="2" :spacing="10">
        <c-box background="green" h="80px"></c-box>
        <c-box background="green" h="80px"></c-box>
        <c-box background="green" h="80px"></c-box>
        <c-box background="green" h="80px"></c-box>
        <c-box background="green" h="80px"></c-box>
        <c-box background="green" h="80px"></c-box>
      </c-simple-grid>
    </c-box>
    `
  }))
  .add('Responsive values', () => ({
    components: { CSimpleGrid, CBox },
    template: `
      <c-box w="80vw">
        <c-simple-grid :columns="[2, null, 3]" spacing="40px">
          <c-box background="green" height="80px"></c-box>
          <c-box background="green" height="80px"></c-box>
          <c-box background="green" height="80px"></c-box>
          <c-box background="green" height="80px"></c-box>
          <c-box background="green" height="80px"></c-box>
        </c-simple-grid>
      </c-box>
    `
  }))
