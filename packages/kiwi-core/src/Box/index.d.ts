import * as StyledSystem from 'styled-system';
import * as Vue from 'vue';
import baseProps from '../config/props/props'
import { Omit } from '../common-types'
import { RecordPropsDefinition, PropsDefinition } from 'vue/types/options';


type borderRadius = StyledSystem.BorderRadiusProps['borderRadius'];
type borderColor = StyledSystem.BorderColorProps['borderColor'];

interface CSS {
  backgroundAttachment?: String
  textDecoration?: String
  textTransform?: String
  appearance?: String
  transform?: String
  transformOrigin?: String
  animation?: String
  userSelect?: String
  pointerEvents?: String
  boxSizing?: String
  cursor?: String
  resize?: String
  transition?: String
  objectFit?: String
  objectPosition?: String
  wordBreak?: String
  overflowWrap?: String
  whiteSpace?: String
  listStyleType?: String
  outline?: String
  float?: String
  willChange?: String
  borderTopWidth?: String
  borderBottomWidth?: String
  borderLeftWidth?: String
  borderRightWidth?: String
  listStyleImage?: String
  listStylePosition?: String
}

interface ICustomConfig {
  // Custom borderRadius alias
  rounded?: borderRadius;
  roundedTop?: borderRadius;
  roundedBottom?: borderRadius;
  roundedLeft?: borderRadius;
  roundedRight?: borderRadius;
  roundedTopRight?: borderRadius;
  roundedTopLeft?: borderRadius;
  roundedBottomRight?: borderRadius;
  roundedBottomLeft?: borderRadius;

  // Custom borderColor alias
  borderBottomColor?: borderColor;
  borderTopColor?: borderColor;
  borderRightColor?: borderColor;
  borderLeftColor?: borderColor;

  // Custom width alias
  w?: StyledSystem.WidthProps['width'];
  minW?: StyledSystem.MinWidthProps['minWidth'];
  maxW?: StyledSystem.MaxWidthProps['maxWidth'];

  // Custom height alias
  h?: StyledSystem.HeightProps['height'];
  minH?: StyledSystem.MinHeightProps['minHeight'];
  maxH?: StyledSystem.MaxHeightProps['maxHeight'];

  // Custom display alias
  d?: StyledSystem.DisplayProps['display'];

  // Custom background alias
  backgroundAttachment?: StyledSystem.ResponsiveValue<
    CSS['backgroundAttachment']
  >;
  // backgroundAttachment?: StyledSystem.ResponsiveValue<
  //   CSS['backgroundAttachment']
  // >;
  bgImg?: StyledSystem.BackgroundImageProps['backgroundImage'];
  bgImage?: StyledSystem.BackgroundImageProps['backgroundImage'];
  bgSize?: StyledSystem.BackgroundSizeProps['backgroundSize'];
  bgPos?: StyledSystem.BackgroundPositionProps['backgroundPosition'];
  pos?: StyledSystem.PositionProps['position'];
  flexDir?: StyledSystem.FlexDirectionProps['flexDirection'];

  // CSS properties
  textDecoration?: StyledSystem.ResponsiveValue<CSS['textDecoration']>;
  textDecor?: StyledSystem.ResponsiveValue<CSS['textDecoration']>;
  textTransform?: StyledSystem.ResponsiveValue<CSS['textTransform']>;
  overflowX?: StyledSystem.OverflowProps['overflow'];
  overflowY?: StyledSystem.OverflowProps['overflow'];
  appearance?: StyledSystem.ResponsiveValue<CSS['appearance']>;
  transform?: StyledSystem.ResponsiveValue<CSS['transform']>;
  transformOrigin?: StyledSystem.ResponsiveValue<CSS['transformOrigin']>;
  animation?: StyledSystem.ResponsiveValue<CSS['animation']>;
  userSelect?: StyledSystem.ResponsiveValue<CSS['userSelect']>;
  pointerEvents?: StyledSystem.ResponsiveValue<CSS['pointerEvents']>;
  boxSizing?: StyledSystem.ResponsiveValue<CSS['boxSizing']>;
  cursor?: StyledSystem.ResponsiveValue<CSS['cursor']>;
  resize?: StyledSystem.ResponsiveValue<CSS['resize']>;
  transition?: StyledSystem.ResponsiveValue<CSS['transition']>;
  objectFit?: StyledSystem.ResponsiveValue<CSS['objectFit']>;
  objectPosition?: StyledSystem.ResponsiveValue<CSS['objectPosition']>;

  // Ellipsis alias
  wordBreak?: StyledSystem.ResponsiveValue<CSS['wordBreak']>;
  overflowWrap?: StyledSystem.ResponsiveValue<CSS['overflowWrap']>;
  whiteSpace?: StyledSystem.ResponsiveValue<CSS['whiteSpace']>;

  // SVG color properties
  fill?: StyledSystem.ColorProps['color'];
  stroke?: StyledSystem.ColorProps['color'];

  bgAttachment?: StyledSystem.ResponsiveValue<CSS['backgroundAttachment']>;
  shadow?: StyledSystem.BoxShadowProps['boxShadow'];

  // List properties
  listStyleType?: StyledSystem.ResponsiveValue<CSS['listStyleType']>;
  listStylePosition?: StyledSystem.ResponsiveValue<CSS['listStylePosition']>;
  listStyleImage?: StyledSystem.ResponsiveValue<CSS['listStyleImage']>;
  listStyleImg?: StyledSystem.ResponsiveValue<CSS['listStyleImage']>;
  listStylePos?: StyledSystem.ResponsiveValue<CSS['listStylePosition']>;

  // Outline prop
  outline?: StyledSystem.ResponsiveValue<CSS['outline']>;
  float?: StyledSystem.ResponsiveValue<CSS['float']>;
  willChange?: StyledSystem.ResponsiveValue<CSS['willChange']>;

  // Border Width props
  borderTopWidth?: StyledSystem.ResponsiveValue<CSS['borderTopWidth']>;
  borderBottomWidth?: StyledSystem.ResponsiveValue<CSS['borderBottomWidth']>;
  borderLeftWidth?: StyledSystem.ResponsiveValue<CSS['borderLeftWidth']>;
  borderRightWidth?: StyledSystem.ResponsiveValue<CSS['borderRightWidth']>;
}

type FontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

interface IFontSize {
  fontSize?:
    | StyledSystem.ResponsiveValue<FontSize>
    | StyledSystem.FontSizeProps['fontSize'];
}

type FontWeight =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

interface IFontWeight {
  fontWeight?:
    | StyledSystem.ResponsiveValue<FontWeight>
    | StyledSystem.FontWeightProps['fontWeight'];
}

type LineHeight = 'none' | 'shorter' | 'short' | 'normal' | 'tall' | 'taller';

interface ILineHeight {
  lineHeight?:
    | StyledSystem.ResponsiveValue<LineHeight>
    | StyledSystem.LineHeightProps['lineHeight'];
}

type LetterSpacing =
  | 'tighter'
  | 'tight'
  | 'normal'
  | 'wide'
  | 'wider'
  | 'widest';

interface ILetterSpacing {
  letterSpacing?:
    | StyledSystem.ResponsiveValue<LetterSpacing>
    | StyledSystem.LetterSpacingProps['letterSpacing'];
}

interface As {
  as?: Vue.VNode['tag'];
}

type TypographyProps = Omit<
  StyledSystem.TypographyProps,
  'fontWeight' | 'lineHeight' | 'fontSize' | 'letterSpacing'
>;

interface Truncated {
  /**
   * If `true`, the text will be truncated
   */
  isTruncated?: boolean;
}

type StyledSystemProps = StyledSystem.LayoutProps &
  StyledSystem.ColorProps &
  StyledSystem.SpaceProps &
  StyledSystem.BordersProps &
  StyledSystem.BackgroundProps &
  StyledSystem.PositionProps &
  StyledSystem.FlexboxProps &
  StyledSystem.ShadowProps &
  StyledSystem.GridProps &
  StyledSystem.OpacityProps &
  StyledSystem.OverflowProps;

type ModifiedStyledSystemProps = TypographyProps &
  IFontSize &
  ILetterSpacing &
  IFontWeight &
  ILineHeight &
  ICustomConfig;

type BoxHTMLProps = HTMLElement

export type BoxProps = BoxHTMLProps &
  StyledSystemProps &
  ModifiedStyledSystemProps &
  As &
  Truncated;

interface BoxProps {
  height?: string | number
}
/**
 * The Box component is the base reusable component which is the building block for all other Kiwi UI components.
 * It by default renders the `<div/>`  HTMLElement.
 */
declare const Box: Vue.Component<PropsDefinition<BoxProps>>

export default Box;
