export const getShowCase = (arr: any[] = []) => {
  if (arr?.find((item) => item.showcase)) {
    return true
  } if (!arr?.find((item) => item.showcase !== false)) {
    return false
  }
  return undefined
}
