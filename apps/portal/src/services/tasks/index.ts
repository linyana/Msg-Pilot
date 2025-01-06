import {
  useHttp,
} from '@msg-pilot/hooks'
import {
  IITaskType,
} from '@/types'
import {
  IMetaType,
} from '../types'

export const useGetTasks = () => useHttp<{
  data: IITaskType[],
  meta: IMetaType
}>({
  url: '/tasks',
  method: 'get',
})
