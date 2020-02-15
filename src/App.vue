<template>
  <Canvas>
    <div>
      <KImage
        shadow="sm"
        htmlWidth="100px"
        src="https://avatars3.githubusercontent.com/u/37928?s=52&v=4"
      />
    </div>
  </Canvas>
</template>

<script lang="js">
import Canvas from './components/Canvas'
import {
  Image as KImage } from '../packages/kiwi-core/dist/esm'

export default {
  name: 'App',
  components: {
    Canvas,
    KImage
  }
}
</script>
