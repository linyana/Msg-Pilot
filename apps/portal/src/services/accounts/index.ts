import {
  useHttp,
} from '@/hooks'
import {
  IMetaType,
} from '../types'
import {
  IAccountType,
} from '@/types'

export const useGetAccounts = () => useHttp<{
  data: IAccountType[],
  meta: IMetaType
}>({
  url: '/accounts',
  method: 'get',
})

export const useCreateAccounts = (data?: IAccountType) => useHttp<{
  data: any,
  meta: IMetaType
}>({
  url: '/accounts',
  method: 'post',
  data,
})

export const useEditAccounts = (id: string, data?: IAccountType) => useHttp<{
  data: any,
  meta: IMetaType
}>({
  url: `/accounts/${id}`,
  method: 'patch',
  data,
})

export const useDeleteAccounts = (id: string) => useHttp<{
  data: any,
  meta: IMetaType
}>({
  url: `/accounts/${id}`,
  method: 'delete',
})
