export const baseProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'md',
  transition: 'all 0.2s',
  flex: '0 0 auto',
  _hover: { bg: 'blackAlpha.100' },
  _active: { bg: 'blackAlpha.200' },
  _disabled: {
    cursor: 'not-allowed'
  },
  _focus: {
    boxShadow: 'outline'
  },
  border: 'none',
  bg: 'blackAlpha.50'
}

export const sizes = {
  lg: {
    button: '40px',
    icon: '16px'
  },
  md: {
    button: '32px',
    icon: '12px'
  },
  sm: {
    button: '24px',
    icon: '10px'
  }
}
