export const formatSubmission = (object: any = {}) => {
  const objectArray: {[x: string]: any}[] = Object.entries(object).map(([key, value]) => {
    if (Array.isArray(value)) {
      return {
        [key.toLowerCase()]: value.join(', '),
      }
    } if (typeof value === 'object' && !Array.isArray(value) && value) {
      const nestedValues = Object.entries(value)
        .map(([nestedKey, nestedValue]) => `${nestedKey}: ${nestedValue}`)
        .join(', ')
      return {
        [key.toLocaleLowerCase()]: nestedValues,
      }
    }
    return {
      [key.toLowerCase()]: value,
    }
  })
  return objectArray.reduce((result, current) => ({
    ...result,
    ...current,
  }), {})
}

export const getFormatSubmissionArray = (object: any = {}) => {
  const array = []
  let product
  let size
  let color
  let sku
  if ('product' in object || 'product1' in object) {
    if (object.product1 || object.product) {
      product = object.product1 || object.product || ''
      if (object.size1 || object.size) {
        size = object.size1 || object.size || ''
      }
      if (object.color1 || object.color) {
        color = object.color1 || object.color || ''
      }
      if (object.sku1 || object.sku || object.tiktoksku1 || object.tiktoksku) {
        sku = object.sku1 || object.sku1 || object.tiktoksku1 || object.tiktoksku || ''
      }
      array.push({
        product,
        size,
        color,
        sku,
      })
    }
  }
  let index = 2
  while (`product${index}` in object) {
    if (object[`product${index}`]) {
      product = object[`product${index}`]
      if (object[`size${index}`]) {
        size = object[`size${index}`] || ''
      }
      if (object[`color${index}`]) {
        color = object[`color${index}`] || ''
      }
      if (object[`sku${index}`] || object[`tiktoksku${index}`]) {
        sku = object[`sku${index}`] || object[`tiktoksku${index}`] || ''
      }
      array.push({
        product,
        size,
        color,
        sku,
      })
    }
    index += 1
  }
  return {
    product_count: index - 1,
    array,
  }
}

export const checkAddToShowCase = (target: any): boolean => {
  if (!target) return false
  try {
    const targetJson = JSON.stringify(target)
    if (targetJson === '[]' || targetJson === '{}') return false
    return !!targetJson
  } catch (e: any) {
    return false
  }
}

export const objectToKeyValueArray = (object: any = {}):Array<{key:string, value:any}> => Object.entries(object).map(([key, value]) => ({
  key: key.charAt(0).toUpperCase() + key.slice(1),
  value,
}))
