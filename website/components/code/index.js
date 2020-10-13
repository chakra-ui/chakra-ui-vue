import CodeBlock from './code-block.vue'
import LiveEditor from './live-editor/live-editor.vue'
import CodeGroup from './code-group/code-group.vue'
import CodeTab from './code-group/code-tab.vue'
import { CopyTextMixin } from './mixins'

const MDXCodeBlock = (props) => {
  const isReadOnly = !props.live
  const lang = props.className || props.lang || 'vue'

  return {
    name: 'CodeBlock',
    extend: CodeBlock,
    mixins: [CopyTextMixin],
    props: {
      ...CodeBlock.props,
      isReadOnly: {
        type: Boolean,
        default: isReadOnly
      },
      lang: {
        type: String,
        default: lang
      }
    },
    render: CodeBlock.render
  }
}

export {
  CodeBlock,
  CodeGroup,
  CodeTab,
  LiveEditor,
  MDXCodeBlock
}
