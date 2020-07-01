/*eslint import/namespace: [2, { allowComputed: true }]*/
import { storiesOf } from '@storybook/vue'
import Vue from 'vue'
import CodeBlock from '../../../chakra-ui-docs/components/CodeBlock.js'
import * as ChakraComponents from '..'

Object.keys(ChakraComponents).forEach((key) => {
  if (typeof ChakraComponents[key] === 'object' && ChakraComponents[key].name) {
    Vue.component(ChakraComponents[key].name, ChakraComponents[key])
  }
})

storiesOf('Playground', module)
  .add('New', () => ({
    components: { CodeBlock: CodeBlock({ live: true, lang: 'vue', className: 'lang-vue' }) },
    template: `
      <c-box max-w="500px">
        <h2 v-chakra font-weight="bold" font-size="xl">Chakra UI Vue Playground ⚡️</h2>
        <CodeBlock>
        {{ code }}
        </CodeBlock>
      </c-box>
    `,
    data: () => ({
      code: `
let value = "Hello Chakra"
<input v-chakra border="2px solid" mr="3" p="2" rounded="md" border-color="blue.400" v-model="value" />
<c-button left-icon="github" variant-color="blue">{{ value }}</c-button>`
    })
  }))
