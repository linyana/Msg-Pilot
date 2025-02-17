import {
  useHttp,
} from '@/hooks'
import {
  ILoginType,
  ILoginResponseType,
} from '@/pages/Login/types'
import {
  IMetaType,
} from '../types'

export const useLogin = (data?: ILoginType) => useHttp<ILoginResponseType>({
  url: '/tenants/sessions',
  method: 'post',
  data,
})

export const useGetInfo = () => useHttp<{
  data: any,
  meta: IMetaType
}>({
  url: '/users/info',
  method: 'get',
})
