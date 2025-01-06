import {
  useHttp,
} from '@msg-pilot/hooks'
import {
  ITaskType,
} from '@/types'
import {
  IMetaType,
} from '../types'

export const useGetTasks = () => useHttp<{
  data: ITaskType[],
  meta: IMetaType
}>({
  url: '/tasks',
  method: 'get',
})
