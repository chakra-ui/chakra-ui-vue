<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 803.02 216">
    <defs>
      <linearGradient id="linear-gradient" y1="108" x2="216" y2="108" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#41b883" />
        <stop offset="1" stop-color="#78ffbe" />
      </linearGradient>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g :fill="colorMode === 'light' ? 'black' : 'rgba(255, 255, 255, 0.92)'" id="Layer_1-2" data-name="Layer 1"><text class="cls-1" transform="translate(273.17 150.87)">chak<tspan class="cls-2" x="375.71" y="0">r</tspan><tspan x="438" y="0">a</tspan></text>
        <path class="cls-3" d="M108,0A108,108,0,1,0,216,108,108,108,0,0,0,108,0ZM74.16,173,103.46,119l-33.85.65,65.62-76.59L106.88,99l39.85-1.85Z" />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'ChakraUILogo',
  inject: ['$colorMode'],
  computed: {
    colorMode () {
      return this.$colorMode()
    }
  }
}
</script>

<style>
  .cls-1 {
    font-size: 158.29px;
    font-family: Inter-Bold, Inter;
    font-weight: 700;
  }

  .cls-2 {
    letter-spacing: -0.02em;
  }

  .cls-3 {
    fill: url(#linear-gradient);
  }
</style>
