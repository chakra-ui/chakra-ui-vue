import Vue from 'vue'

/**
 * The alert component for relaying useful information to the UI
 */
export const Alert: Vue.Component<{
  status?: String,
  variant?: String
}>;

/**
 * Icon component for composing alerts
 */
export const AlertIcon: Vue.Component<{}>;

/**
 * Alert title component for composing alert title.
 */
export const AlertTitle: Vue.Component<{}>;

/**
 * Alert description component for composing alert descriptions.
 */
export const AlertDescription: Vue.Component<{}>;
