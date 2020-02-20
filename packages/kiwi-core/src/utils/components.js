export const isVueComponent = (value) => {
  return (!!value && !!value.$el)
}
