import { reactive, onMounted } from '@vue/composition-api'

export function useIncrement () {
  const state = reactive({
    greeting: 'Hi!',
    buttonText: 'Simple Text',
    count: 0
  })

  // Methods
  const increment = () => state.count++

  onMounted(() => {
    console.log('Mounted App')
  })

  return {
    state, increment
  }
}
