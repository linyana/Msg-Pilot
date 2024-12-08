export const getMerchant_approval = (arr: any[] = []) => {
  if (arr.length === 0) return undefined
  if (arr?.find((item) => Number(item.merchant_approval) === 1)) {
    return 1
  } if (!arr?.find((item) => Number(item.merchant_approval) !== 2)) {
    return 2
  }
  return undefined
}
