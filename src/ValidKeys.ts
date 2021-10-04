const validChars = ' ,-.\'?!":;#$%^&*()-_+=[]{}|/<>`~1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const validKeys: {[key: string]: boolean} = {
  Backspace: true
}
for (let i = 0; i < validChars.length; i++) {
  validKeys[validChars.charAt(i)] = true
}
export {
  validKeys
}
