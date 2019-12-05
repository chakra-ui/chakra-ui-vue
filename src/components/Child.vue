<template>
  <button :style="{
    padding: '8px 12px',
    color: '#fff',
    backgroundColor: 'coral',
    fontWeight: 'bold'
  }">Child Button</button>
</template>

<script>
export default {
  name: 'Child',
  props: {
    forwardRef: undefined
  },
  mounted () {
    setTimeout(() => {
      console.log('setTimeout', this.forwardRef)
    })
  }
}
</script>
