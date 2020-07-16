import { storiesOf } from '@storybook/vue'
import { CButton, CCollapse, CBox } from '..'

storiesOf('UI | Collapse', module)
  .add('Basic Usage', () => ({
    components: { CButton, CCollapse, CBox },
    template: `
      <div>
        <CButton mb="4" @click="showCollapsed = !showCollapsed">Collapse</CButton>
        <CCollapse @finish="handleFinished" :isOpen="showCollapsed">
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
    },
    methods: {
      handleFinished (e) {
        console.log('Collapse complete!', e)
      }
    }
  }))
  .add('Changing the startingHeight', () => ({
    components: { CButton, CCollapse, CBox },
    template: `
      <div>
        <CButton mb="4" @click="showCollapsed = !showCollapsed">Collapse</CButton>
        <CCollapse :animate-opacity="false" :isOpen="showCollapsed" :startingHeight="24">
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
  .add('Add easing to entering and leaving state', () => ({
    components: { CButton, CCollapse, CBox },
    template: `
      <div>
      <CButton @click="showCollapsed = !showCollapsed">Collapse</CButton>
      <CCollapse :animate-opacity="false" :isOpen="showCollapsed" easing="cubicBezier(.5, .05, .1, .3)">
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
  .add('Add duration to easing function', () => ({
    components: { CButton, CCollapse, CBox },
    template: `
      <div>
      <CButton @click="showCollapsed = !showCollapsed">Collapse</CButton>
      <CCollapse :animate-opacity="false" :isOpen="showCollapsed" :duration="600" easing="cubicBezier(.5, .05, .1, .3)">
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
