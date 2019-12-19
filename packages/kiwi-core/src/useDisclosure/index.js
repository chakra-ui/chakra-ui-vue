import { ref } from '@vue/composition-api'

/**
 * Use disclosure allows us to use resusable logic for dialogs, modals and drawers
 * @param {Boolean} defaultIsOpen Default boolean value for useDisclosure hook
 */
export function useDisclosure (defaultIsOpen) {
  const isOpen = ref(Boolean(defaultIsOpen))
  const onOpen = () => {
    isOpen.value = true
  }
  const onClose = () => {
    isOpen.value = false
  }
  const onToggle = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  }
}
