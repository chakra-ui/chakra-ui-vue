import Vue from 'vue'

export const defineColorModeObserver = ({ colorMode, theme, icons, toggleColorMode } = {}) => Vue.observable({
  colorMode,
  theme,
  icons,
  toggleColorMode
})

/**
 * This observed store object observed the colorMode and stores it in an
 * observed object that other components can consume.
 */
export const colorModeObserver = defineColorModeObserver({
  toggleColorMode: emitToggleColorMode
})

/**
 * Utility function that returns a value based on the colorMode
 * @param {string | number | Array<string | number>} lightValue Value when colorMode is `light`
 * @param {string | number | Array<string | number>} darkValue Value when colorMode is `dark`
 * @param {import('Vue').ComponentOptions<Vue, { colorMode: 'light' | 'dark', theme: any, icons: any }>} observer Value when colorMode is `dark`
 * @return {string | number | Array<string | number>}
 */
export const mode = (lightValue, darkValue, observer) => {
  const { colorMode } = observer || colorModeObserver
  return colorMode === 'dark' ? darkValue : lightValue
}

const changeColorModeListeners = []

export const colorModeObserverEventBus = new Vue()

colorModeObserverEventBus.$on('change:colorMode', (newVal) => {
  colorModeObserver.colorMode = newVal
  changeColorModeListeners.forEach(handler => handler(newVal))
})

export function emitToggleColorMode () {
  colorModeObserverEventBus.$emit('command:toggleColorMode')
}

export const onUpdateColorMode = fn => changeColorModeListeners.push(fn)
