import {
  useHttp,
} from '@/hooks'
import {
  ICreateTaskType,
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

export const useCreateTask = (data?: ICreateTaskType) => useHttp<{
  data: any,
  meta: IMetaType
}>({
  url: '/tasks',
  method: 'post',
  data,
})

export const useRetryTask = (data: {
  task_id: number
}) => useHttp<{
  data: any,
  meta: IMetaType
}>({
  url: `/tasks/${data.task_id}`,
  method: 'post',
  data,
})
