<script>
import {
  CTab,
  CTabs,
  CTabList,
  CTabPanel,
  CTabPanels
} from '@chakra-ui/vue'
import CodeBlock from '../code-block.vue'
import { tryParseBoolean } from '../utils'

export default {
  name: 'CodeGroup',
  props: {
    lang: {
      type: String,
      required: false,
      default: ''
    },
    live: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  render (h) {
    const getPanelCode = (vnode) => {
      // traverse until we reach the *Text* node
      let lastVNode = null
      let node = vnode
      while (node?.componentOptions?.children) {
        lastVNode = node
        node = node?.componentOptions?.children[0]
      }

      if (!lastVNode?.tag.includes(CodeBlock.name)) {
        // node is not a CodeBlock component, reset this
        lastVNode = null
      }

      return { code: node?.text, codeBlock: lastVNode }
    }

    const tabs = this.$scopedSlots.default()
    const tabLabels = tabs.map(vnode => h(CTab, { attrs: { py: 2 } }, [vnode.componentOptions.propsData.label]))
    const tabPanels = tabs.map((vnode) => {
      const { code, codeBlock } = getPanelCode(vnode)

      const lang = vnode.componentOptions?.propsData.lang || this.lang
      const live = tryParseBoolean(vnode.componentOptions?.propsData.live) ?? this.live

      if (codeBlock) {
        const codeBlockLangProp = codeBlock.data?.className || codeBlock?.data?.lang
        const codeBlockLiveProp = tryParseBoolean(codeBlock.data?.live)

        // merge component and mdx options, predefined mdx codeblock values take precedence
        codeBlock.componentOptions.propsData.lang = codeBlockLangProp || lang
        codeBlock.componentOptions.propsData.isReadOnly = !(codeBlockLiveProp ?? live)
        return h(CTabPanel, [codeBlock])
      }

      return h(CTabPanel, [h(CodeBlock, { props: { lang, isReadOnly: !live } }, [code])])
    })

    return h(CTabs, {
      props: { size: 'sm', variantColor: 'vue' },
      attrs: { rounded: 'md', bg: '#011627', color: 'white' }
    }, [
      h(CTabList, { attrs: { borderColor: 'vue.800' } }, tabLabels),
      h(CTabPanels, tabPanels)
    ])
  }
}
</script>

<style lang="scss" scoped>
::v-deep [role="tab"][aria-selected] {
  color: #3caa79 !important; // vue.500
}
</style>
