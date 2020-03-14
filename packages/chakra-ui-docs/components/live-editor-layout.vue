<template functional>
  <div class="preview-code">
    <div class="preview-panel">
      <slot name="preview" />
    </div>
    <div class="editor-panel">
      <slot name="editor" />
    </div>
  </div>
</template>

<style>
.preview-code {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  background: #fff;
}

.preview-panel {
  height: auto;
  background: #fff;
  border: #efefef 1px solid;
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
}
</style>
