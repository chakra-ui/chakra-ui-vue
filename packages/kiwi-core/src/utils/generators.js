export function createUuid (size) {
  let uuid = ''
  const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < size; i++) {
    uuid += dictionary.charAt(Math.floor(Math.random() * dictionary.length))
  }
  return uuid
}
