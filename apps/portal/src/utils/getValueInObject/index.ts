export const getValueInObject = (object: any, keyName: string) => {
  const lowercaseKeyName = keyName.toLowerCase()
  const matchedKey = Object.keys(object || {}).find((key) => key.toLowerCase() === lowercaseKeyName)
  return matchedKey ? object[matchedKey] : ''
}
