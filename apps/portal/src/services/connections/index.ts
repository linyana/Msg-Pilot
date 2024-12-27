import {
  useHttp,
} from '@msg-pilot/hooks'
import {
  IConnectionType,
  ICreateConnectionType,
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

export const useCreateConnection = (data?: ICreateConnectionType) => useHttp<{
  data: IConnectionType[],
  meta: IMetaType
}>({
  url: '/connections',
  method: 'post',
  data,
})
