import { storiesOf } from '@storybook/vue'
import { _CBox } from './CBox.js'
import { CBox, CInput } from '..'

storiesOf('UI | Box', module)
  .add('Box', () => ({
    components: { CBox },
    template: `
      <div>
        <CBox
          :w="['auto']"
          px="5"
          py="5"
          shadow="lg"
          my="5"
          mb="5"
          rounded="sm"
          font-family="body"
          background-color="blue.200"
          color="blue.700"
        >
          This is box component
        </CBox>
      </div>
    `
  }))
  .add('Box with custom values', () => ({
    components: { CBox },
    template: `
      <div>
        <CBox
          w="300px"
          h="200px"
          font-family="body"
          objectFit="contain"
          bgImg="url(https://lh3.googleusercontent.com/proxy/vG0O53R9-vPA2WpuC5lXWCHIVuIQiQ1R7bpQ1UcDsHnHVlz2BJMeSeJx1I1n4huq_SeB39iegxgQl1zXcnNqpq2IJfCgQwwWXpdRG9pNdA)"
        >
          <CBox h="full" bg="red.200" :w="1/2" />
        </CBox>
      </div>
    `
  }))
  .add('_CBox Box', () => ({
    components: { CBox: _CBox, CInput },
    template: `
      <div v-chakra d="block" w="100vw" overflow="scroll" h="100vh">
        <br />
        <br />
        <br />
        <input type="text" v-model="title" />
        <br />
        <br />
        <c-box m="1" p="2" font-style="italic" :bg="['pink.200', 'yellow.200', 'blue.200']" font-weight="bold" v-for="i in 1" :random-attr="'box-' + i" :key="'box-' + i">
          {{ title }}
        </c-box>
        <c-box m="1" p="2" font-style="italic" :bg="['red.200', 'orange.200', 'green.200']" font-weight="bold" v-for="i in 1" :random-attr="'box-2-' + i" :key="'box-2-' + i">
          Another ignored box
        </c-box>
      </div>
    `,
    data () {
      return {
        title: 'Hello world'
      }
    },
    computed: {
      color () {
        return this.title.length > 4 ? 'red' : 'blue'
      }
    }
  }))
