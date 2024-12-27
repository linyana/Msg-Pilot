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
  data: string,
  meta: IMetaType
}>({
  url: '/connections',
  method: 'post',
  data,
})

export const useChooseConnection = (data: {
  connection_id?: number
}) => useHttp<{
  data: {
    access: string
  },
  meta: IMetaType
}>({
  url: '/tenants/choose-connection',
  method: 'post',
  data,
})
