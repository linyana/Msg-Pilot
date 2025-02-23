import {
  useHttp,
} from '@/hooks'
import {
  IAccountType,
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

export const useGetTask = (unit: string) => useHttp<{
  data: ITaskType & {
    task_accounts: {
      account: IAccountType
    }[]
  },
  meta: IMetaType
}>({
  url: `/tasks/${unit}`,
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
