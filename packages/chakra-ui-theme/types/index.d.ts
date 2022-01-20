export type ColorMode = 'light' | 'dark'

type BaseStyleReturn = (({ colorMode: ColorMode, theme: Theme }) => any) | any

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
  space:    { [key: string]: string },
  baseStyles: Record<ComponentNames, BaseStyleReturn>
}

export type ComponentNames =
  'CAccordion' |
  'CAccordionHeader' |
  'CAccordionIcon' |
  'CAccordionItem' |
  'CAccordionPanel' |
  'CAlert' |
  'CAlertDescription' |
  'CAlertDialog' |
  'CAlertDialogBody' |
  'CAlertDialogCloseButton' |
  'CAlertDialogContent' |
  'CAlertDialogFooter' |
  'CAlertDialogHeader' |
  'CAlertDialogOverlay' |
  'CAlertIcon' |
  'CAlertTitle' |
  'CAnimateHeight' |
  'CAspectRatioBox' |
  'CAvatar' |
  'CAvatarBadge' |
  'CAvatarGroup' |
  'CBadge' |
  'CBox' |
  'CBreadcrumb' |
  'CBreadcrumbItem' |
  'CBreadcrumbLink' |
  'CBreadcrumbSeparator' |
  'CButton' |
  'CButtonGroup' |
  'CCheckbox' |
  'CCheckboxGroup' |
  'CCircularProgress' |
  'CCircularProgressLabel' |
  'CCloseButton' |
  'CCode' |
  'CCollapse' |
  'CColorModeProvider' |
  'CControlBox' |
  'CDarkMode' |
  'CDivider' |
  'CDrawer' |
  'CDrawerBody' |
  'CDrawerCloseButton' |
  'CDrawerContent' |
  'CDrawerFooter' |
  'CDrawerHeader' |
  'CDrawerOverlay' |
  'CEditable' |
  'CEditableInput' |
  'CEditablePreview' |
  'CFade' |
  'CFlex' |
  'CFormControl' |
  'CFormErrorMessage' |
  'CFormHelperText' |
  'CFormLabel' |
  'CFragment' |
  'CGrid' |
  'CHeading' |
  'CIcon' |
  'CIconButton' |
  'CImage' |
  'CInput' |
  'CInputAddon' |
  'CInputElement' |
  'CInputGroup' |
  'CInputLeftAddon' |
  'CInputLeftElement' |
  'CInputRightAddon' |
  'CInputRightElement' |
  'CLightMode' |
  'CLink' |
  'CList' |
  'CListIcon' |
  'CListItem' |
  'CMenu' |
  'CMenuButton' |
  'CMenuDivider' |
  'CMenuGroup' |
  'CMenuItem' |
  'CMenuItemOption' |
  'CMenuList' |
  'CMenuOptionGroup' |
  'CModal' |
  'CModalBody' |
  'CModalCloseButton' |
  'CModalContent' |
  'CModalFooter' |
  'CModalHeader' |
  'CModalOverlay' |
  'CNumberDecrementStepper' |
  'CNumberIncrementStepper' |
  'CNumberInput' |
  'CNumberInputField' |
  'CNumberInputStepper' |
  'CPopover' |
  'CPopoverArrow' |
  'CPopoverBody' |
  'CPopoverCloseButton' |
  'CPopoverContent' |
  'CPopoverFooter' |
  'CPopoverHeader' |
  'CPopoverTrigger' |
  'CPopper' |
  'CPopperArrow' |
  'CPortal' |
  'CProgress' |
  'CProgressLabel' |
  'CPseudoBox' |
  'CRadio' |
  'CRadioButtonGroup' |
  'CRadioGroup' |
  'CReset' |
  'CRevealHeight' |
  'CScale' |
  'CSelect' |
  'CSimpleGrid' |
  'CSlide' |
  'CSlideIn' |
  'CSlider' |
  'CSliderFilledTrack' |
  'CSliderThumb' |
  'CSliderTrack' |
  'CSpinner' |
  'CStack' |
  'CStat' |
  'CStatArrow' |
  'CStatGroup' |
  'CStatHelperText' |
  'CStatLabel' |
  'CStatNumber' |
  'CSwitch' |
  'CTab' |
  'CTabList' |
  'CTabPanel' |
  'CTabPanels' |
  'CTabs' |
  'CTag' |
  'CTagCloseButton' |
  'CTagIcon' |
  'CTagLabel' |
  'CText' |
  'CTextarea' |
  'CThemeProvider' |
  'CTooltip' |
  'CVisuallyHidden'

export interface ThemeConfig {
  initialColorMode?: ColorMode
  useSystemColorMode?: boolean,
  cssVarPrefix?: string
}

declare const theme: Theme

export default theme
