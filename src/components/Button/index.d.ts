import * as Vue from 'vue';

declare const Button: Vue.Component<{
  as?: String,
  type?: String,
  cast?: String,
  variant?: String
  variantColor?: [String, Array<String>],
  disabled?: Boolean,
  isLoading?: Boolean,
  isActive?: Boolean,
  size?: String,
  loadingText?: String,
  iconSpacing?: String,
  rounded?: Boolean,
}>;
export default Button;
