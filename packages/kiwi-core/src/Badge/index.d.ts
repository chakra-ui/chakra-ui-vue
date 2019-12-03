import Vue from 'vue'

export interface IBadge {
  /**
   * The color scheme of the badge
   */
  variantColor?: string;
  /**
   * The variant of the badge
   */
  variant?: "solid" | "subtle" | "outline";
}

/**
 * The Badge component is used for state, general text, and number labels.
 */
declare const Badge: Vue.Component<{}>;

export default Badge;
