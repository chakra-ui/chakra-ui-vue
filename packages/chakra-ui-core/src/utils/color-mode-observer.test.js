import { mode, defineColorModeObserver } from './color-mode-observer'

describe('colorModeObserver', () => {
  it('`colorModeObserver` should provide and observe values', () => {
    const baseTheme = {
      colors: {
        success: '#3ea76a',
        warning: '#ffc61a',
        error: '#dd3b4b'
      },
      shadows: {
        outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
        inner: 'inset 0 2px 4px 0 rgba( 0, 0, 0, 0.06)'
      },
      baseStyles: {
        CButton: {
          bg: 'success',
          borderRadius: '200px',
          shadow: 'inner'
        }
      }
    }

    const observer = defineColorModeObserver()

    observer.theme = baseTheme
    observer.colorMode = 'light'
    expect(observer.theme).toEqual(baseTheme)
    expect(observer.colorMode).toEqual('light')

    // Mutate `colorMode`
    observer.colorMode = 'dark'
    const readColorMode = observer.colorMode
    expect(readColorMode).toBe('dark')
    expect(readColorMode).toEqual(observer.colorMode)

    // Mutate `theme`
    const newTheme = Object.assign(baseTheme, {
      colors: {
        info: '#0000FF'
      }
    })
    observer.theme = newTheme
    const readTheme = observer.theme
    expect(readTheme).toMatchObject(newTheme)
    expect(readTheme).toMatchSnapshot()
  })

  it('`mode` function should return current colorMode value', () => {
    const observer = defineColorModeObserver({
      colorMode: 'dark'
    })

    const bg = mode('red', 'blue', observer)
    expect(bg).toBe('blue')
    observer.colorMode = 'light'

    // We invoke as a function since we are in a non-reactive context
    const _bg = mode('red', 'blue', observer)
    expect(_bg).toBe('red')
  })
})
