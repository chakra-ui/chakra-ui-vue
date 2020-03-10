import { proxyAliases as pxls } from './proxy'

describe('Proxy Alias props utility', () => {
  it('should forward longhand props', () => {
    const props = {
      textDecoration: 'none'
    }
    expect(pxls(props)).toEqual(props)
  })

  it('should trap and replace single proxied prop', () => {
    const props = {
      d: 'flex'
    }
    expect(pxls(props)).toEqual({ display: 'flex' })
  })

  it('should trap and replace multiple declaration proxied props', () => {
    const props = {
      roundedTop: '2rem'
    }
    expect(pxls(props)).toEqual({
      borderTopLeftRadius: '2rem',
      borderTopRightRadius: '2rem'
    })
  })
})
