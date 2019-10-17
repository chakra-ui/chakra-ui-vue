import * as Vue from 'vue';

declare const Button: Vue.Component<{
  as?: String,
  color?: String,
  variant?: String,
  active?: Boolean,
  disabled?: Boolean,
  isLoading?: Boolean,
  size?: String,
  loadingText?: String,
  px?: String,
  py?: String,
  iconSpacing?: String,
  rounded?: Boolean,
  ripple?: Boolean,
  shadow?: Boolean
}>;
export default Button;
