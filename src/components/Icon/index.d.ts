import * as Vue from 'vue';

/**
 * Icon component for UI representations
 */
declare const IconButton: Vue.Component<{
  name?: [String, Array<String>],
  use?:  [String, Array<String>],
  pack?:  String,
  size?:  [String, Number, Array<String>],
  color?:  [String, Array<String>],
}>;
export default IconButton;
