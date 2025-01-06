import {
  StatusType,
} from '@/constants/types'

export const getSelectOptions = (options: Record<string, string>) => Object.keys(options).map((key) => ({
  content: key,
  value: options[key],
}))

export const getDisplayNameByCode = (
  STATUS: StatusType,
  code: string | number,
): string =>
  Object.values(STATUS)?.find(
    (p) => p.code === +code,
  )?.displayName || ''

export const getCodeByDisplayName = (
  STATUS: StatusType,
  displayName: string,
): string | number =>
  Object.values(STATUS)?.find(
    (p) => p.displayName === displayName,
  )?.code || ''

export const dataURLtoBlob = (dataurl: string, fileName: string) => {
  const arr: any = dataurl.split(',')
  const mime = arr[0]?.match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const blob: any = new Blob([u8arr], {
    type: mime,
  })
  blob.lastModifiedDate = new Date()
  blob.name = fileName
  return blob
}
export const readFileAsBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => {
    const base64String = reader.result
    resolve(base64String)
  }
  reader.onerror = (error) => {
    reject(error)
  }
  reader.readAsDataURL(file)
})
