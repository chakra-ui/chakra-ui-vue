<template>
  <button
    tabindex="0"
    :style="{
      borderRadius: rounded === true ? '999px' : '5px',
      padding: `${py}em ${px}em`,
      fontSize: size === 'sm' ? '0.8rem' :
        size === 'lg' ? '1.5rem' : '1rem'
    }"
    :disabled="disabled"
    class="k-button"
    :class="[color, variant, { ripple, shadow, rounded, disabled }]"
    @click="$emit('click', $event)"
    @keydown.space="$emit('click', $event)"
    @keydown.enter="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  inject: ['$theme', '$colorMode'],
  props: {
    as: {
      type: String,
      default: 'button',
      validator: (value) => value.match(/^(button|div|a)$/)
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value) =>
        value.match(/^(primary|secondary|success|warning|danger|dark)$/)
    },
    variant: {
      type: String,
      default: 'solid',
      validator: (value) =>
        value.match(/^(solid|outlined|ghost|flat|link)$/)
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => value.match(/^(sm|md|lg)$/)
    },
    loadingText: {
      type: String,
      default: 'Loading',
      validator: (value) => typeof value === 'string'
    },
    px: {
      type: Number,
      validator: (value) => value >= 0
    },
    py: {
      type: Number,
      validator: (value) => value >= 0
    },
    iconSpacing: {
      type: String,
      validator: (value) => value >= 0
    },
    rounded: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../lib/styles/components/Button";
</style>
