import styled from 'vue-styled-components'
import Box from '../Box'

const VisuallyHidden = styled(Box, {
  w: [String, Number],
  h: [String, Number],
  pos: String
})`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: ${props => props.w || '1px'};
  width: ${props => props.h || '1px'};
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: ${props => props.pos || 'absolute'};
`

export default VisuallyHidden
