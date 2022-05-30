interface ChakraToastOptions {
  position?: 'bottom' | 'top' | 'right' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  duration?: number
  render?: (options: { onClose?: VoidFunction, id: any }) => any
  title?: string
  description?: string
  status?: 'info' | 'warning' | 'success' | 'error'
  variant?: 'solid' | 'subtle' | 'top-accent' | 'left-accent'
  isClosable?: boolean
}

export type ToastFactory = (options: ChakraToastOptions) => void

export function useToast(): ToastFactory

export default useToast
