<template functional>
  <div class="preview-code">
    <div class="preview-panel">
      <slot name="preview" />
    </div>
    <div class="editor-panel">
      <Button
        chakra-copy-button
        variantColor="vue"
        position="absolute"
        size="sm"
        top="0.2rem"
        right="0.125rem"
        textTransform="uppercase"
        transform="scale(0.8)"
      >Copy</Button>
      <slot name="editor" />
    </div>
  </div>
</template>
<script>
import { Button } from '@chakra-ui/vue'

export default {
  name: 'EditorLayout',
  components: {
    Button
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
  border: #CBD5E0 1px solid;
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
</style>
