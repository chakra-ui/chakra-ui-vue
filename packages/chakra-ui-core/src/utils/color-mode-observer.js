import Vue from 'vue'

/**
 * This observed store object observed the colorMode and stores it in an
 * oberved object that other components can consume.
 */
export const colorModeObserver = Vue.observable({
  colorMode: undefined,
  theme: undefined,
  icons: undefined
})
