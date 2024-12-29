import {
  useHttp,
} from '@msg-pilot/hooks'
import {
  IMetaType,
} from '../types'

export const useGetAccounts = () => useHttp<{
  data: any,
  meta: IMetaType
}>({
  url: '/accounts',
  method: 'get',
})
