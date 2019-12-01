import * as Vue from 'vue';

interface ICloseButton {
  /**
   * The size of the close button
   */
  size?: "lg" | "md" | "sm";
  /**
   * If `true`, the close button will be disabled
   */
  isDisabled?: boolean;
  /**
   * The color of the close icon
   */
  color?: string;
  /**
   * An accessible label for the close button
   */
  "aria-label"?: string;
}

export type CloseButtonProps = ICloseButton;

/**
 * Close button component for UI interfaces
 */
declare const CloseButton: Vue.Component<CloseButtonProps>;

export default CloseButton;
