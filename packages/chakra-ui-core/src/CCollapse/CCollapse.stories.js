import { storiesOf } from '@storybook/vue'
import { CButton, CCollapse, CBox } from '..'

storiesOf('UI | Collapse', module)
  .add('Basic Usage', () => ({
    components: { CButton, CCollapse, CBox },
    template: `
      <div>
        <CButton @click="showCollapsed = !showCollapsed">Collapse</CButton>
        <CCollapse :isOpen="showCollapsed">
          <CBox bg="tomato" w="250px">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae officia rem mollitia molestias eveniet, reiciendis perspiciatis minima deleniti iure voluptates laborum vel accusamus enim officiis dolorum necessitatibus, animi perferendis reprehenderit!
          </CBox>
        </CCollapse>
      </div>
    `,
    data () {
      return {
        showCollapsed: true
      }
    }
  }))
  .add('Changing the startingHeigh', () => ({
    components: { CButton, CCollapse, CBox },
    template: `
      <div>
        <CButton @click="showCollapsed = !showCollapsed">Collapse</CButton>
        <CCollapse :isOpen="showCollapsed" :startingHeight="24">
          <CBox bg="tomato" w="250px">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae officia rem mollitia molestias eveniet, reiciendis perspiciatis minima deleniti iure voluptates laborum vel accusamus enim officiis dolorum necessitatibus, animi perferendis reprehenderit!
          </CBox>
        </CCollapse>
      </div>
    `,
    data () {
      return {
        showCollapsed: true
      }
    }
  }))
