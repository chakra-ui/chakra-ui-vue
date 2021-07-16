import { css } from '@chakra-ui/styled-system'

export const composeSystem = (props = {}, theme = {}) =>
  css(props)(theme)
