import {
  useHttp,
} from '@msg-pilot/hooks'
import {
  ILoginType,
  ILoginResponseType,
} from '@/pages/Login/types'

export const useLogin = (data: ILoginType) => useHttp<ILoginResponseType>({
  url: '/tenants/sessions',
  method: 'post',
  data,
})

export const useSampleLogin = (data: ILoginType) => useHttp<ILoginResponseType>({
  url: '/sample/sessions',
  method: 'post',
  data,
})

export const useSampleRegister = (data: ILoginType) => useHttp<ILoginResponseType>({
  url: '/sample/register',
  method: 'post',
  data,
})
