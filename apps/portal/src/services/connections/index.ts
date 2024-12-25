import {
  useHttp,
} from '@msg-pilot/hooks'
import {
  IConnectionType,
} from '@/types'
import {
  IMetaType,
} from '../types'

export const useGetConnections = () => useHttp<{
  data: IConnectionType[],
  meta: IMetaType
}>({
  url: '/connections',
  method: 'get',
})
