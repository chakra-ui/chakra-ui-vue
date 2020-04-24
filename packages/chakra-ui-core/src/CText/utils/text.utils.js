
/**
 * Returns truncation style props for text elements.
 * @todo Add line-clamp features for text.
 */
export const useTruncated = () => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})
