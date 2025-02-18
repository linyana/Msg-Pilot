import {
  useState,
  useEffect,
} from 'react'

type KeyRule = `msg-pilot-${string}`

const parseJSON = <T, >(value: string | null): T | undefined => {
  try {
    return value === 'undefined' ? undefined : parseJSON(value ?? '')
  } catch {
    console.warn('parsing error on', {
      value,
    })
    return undefined
  }
}

export const useStorage = (
  key: KeyRule,
  defaultValue: any,
  storageType: 'localStorage' | 'sessionStorage',
) => {
  if (!key.startsWith('msg-pilot-')) {
    throw new Error('storage key should start with "msg-pilot-"')
  }

  const [value, setValue] = useState(defaultValue)
  const storage = storageType === 'sessionStorage' ? window.sessionStorage : window.localStorage
  useEffect(() => {
    try {
      const value = storage.getItem(key)
      if (value) {
        setValue(parseJSON(value))
      } else {
        storage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      setValue(parseJSON(value))
      if (error instanceof Error) console.error(error.message)
    }
  }, [])

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }, [value])

  const removeValue = () => {
    try {
      storage.removeItem(key)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }

  return [value, setValue, removeValue]
}

export const useLocalStorage = (
  key: KeyRule,
  defaultValue: any,
) => useStorage(key, defaultValue, 'localStorage')

export const useSessionStorage = (
  key: KeyRule,
  defaultValue: any,
) => useStorage(key, defaultValue, 'sessionStorage')
