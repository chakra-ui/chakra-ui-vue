<template>
  <button :style="buttonStyles" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="css" scoped>
button {
  border: 1px solid #eee;
  border-radius: 3;
  background-color: #ff0055;
  color: #fff;
  cursor: pointer;
  font-size: 15;
  padding: 3px 10px;
  margin: 10;
}
</style>
