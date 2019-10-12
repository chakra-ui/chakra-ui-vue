import ThemeProvider from '../../components/ThemeProvider'

/**
 * @description Provides Kiwi theme to component
 * @param {Function} h Vue render function
 * @param {Vue.Component} Component - Vue component
 */
export const provideTheme = (h, Component) => {
  return h(ThemeProvider, {}, [h(Component)])
}
