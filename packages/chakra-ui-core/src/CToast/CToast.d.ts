interface ChakraToastOptions {
  position?: 'bottom' | 'top' | 'right' | 'left'
  duration?: number
  render?: (options: { onClose?: VoidFunction, id: any }) => any
  title?: string
  description?: string
  status?: 'info' | 'warning' | 'success' | 'error'
  variant?: 'solid' | 'subtle' | 'top-accent' | 'left-accent'
  isClosable?: boolean
}

function useToast(): (options: ChakraToastOptions) => void

export default useToast
