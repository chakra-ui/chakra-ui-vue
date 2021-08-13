export type Theme = {
  breakpoints: { [key: string]: string }
  zIndices: { [key: string]: string | number }
  radii:    { [key: string]: string }
  opacity:  { [key: string]: string }
  borders:  { [key: string]: string }
  colors:   { [key: string]: string | { [opacity: string]: string }}
  fonts: {
    heading: string
    body: string
    mono: string
  }
  fontSizes:      { [key: string]: string }
  fontWeights:    { [key: string]: number }
  letterSpacings: { [key: string]: string }
  lineHeights:    { [key: string]: string }
  borderWidths:   { [key: string]: string }
  shadows:  { [key: string]: string }
  sizes:    { [key: string]: string }
  space:    { [key: string]: string }
}

declare const theme: Theme

export default theme
