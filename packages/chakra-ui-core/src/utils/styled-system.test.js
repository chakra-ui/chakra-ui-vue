import { __get } from './styled-system'

describe('__get', () => {
  it('should return correct value for given path', () => {
    const theme = {
      baseStyle: {
        Button: {
          bg: 'red.400',
          color: 'black'
        }
      },
      colors: {
        red: {
          400: '#ff0000'
        }
      }
    }

    expect(__get(theme, 1)).toBeUndefined()
    expect(__get(theme, 'someRandomKey')).toBeUndefined()
    expect(__get(theme, 'colors.red.500')).toBeUndefined()
    expect(__get(theme, 'baseStyle.Button.bg._focus')).toBeUndefined()

    expect(__get(theme, 'baseStyle.Button')).toMatchSnapshot()
    expect(__get(theme, 'baseStyle.Button.bg')).toMatchSnapshot()
    expect(__get(theme, 'baseStyle.Button.color')).toMatchSnapshot()
    expect(__get(theme, 'colors.red.400')).toMatchSnapshot()

    expect(__get(theme.baseStyle, 'Button')).toMatchSnapshot()
    expect(__get(theme.baseStyle, 'Button.bg')).toMatchSnapshot()
    expect(__get(theme.baseStyle, 'Button.color')).toMatchSnapshot()
    expect(__get(theme.colors, 'red.400')).toMatchSnapshot()
  })

  it('should return provide default value if specified', () => {
    const theme = {
      baseStyle: {
        Button: {
          bg: 'red.400',
          color: 'black'
        }
      },
      colors: {
        red: {
          400: '#ff0000'
        }
      }
    }

    expect(__get(theme, 1, 'default')).toEqual('default')
    expect(__get(theme, 'someRandomKey', 'default')).toEqual('default')
    expect(__get(theme, 'colors.red.500', 'default')).toEqual('default')
    expect(__get(theme, 'baseStyle.Button.bg._focus', 'default')).toEqual('default')
  })
})
