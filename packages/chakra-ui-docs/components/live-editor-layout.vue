<template functional>
  <div class="preview-code">
    <div class="preview-panel">
      <slot name="preview" />
    </div>
    <div class="editor-panel">
      <CButton
        chakra-copy-button
        variant-color="vue"
        position="absolute"
        size="sm"
        top="1.5rem"
        right="0.125rem"
        text-transform="uppercase"
        transform="scale(0.8)"
      >
        Copy
      </CButton>
      <div
        class="editable-example-notice"
      >
        Editable Example
      </div>
      <slot name="editor" />
    </div>
  </div>
</template>
<script>
import { CButton } from '@chakra-ui/vue'

export default {
  name: 'EditorLayout',
  components: {
    CButton
  }
}
</script>

<style>
.preview-code {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;

  background: inherit;
}

.preview-panel {
  height: auto;
  background: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: inherit;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
}

.editor-panel {
  height: auto;
  margin-top: 1rem;
  border-radius: inherit;
  overflow: hidden;
  font-size: 0.85em;
  position: relative;
}

.editable-example-notice {
  position: relative;
  font-weight: bold;
  color: #efefef;
  text-transform: uppercase;
  font-size: 0.75rem;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
}

.prism-editor__code {
  padding-top: 20px;
}
</style>
