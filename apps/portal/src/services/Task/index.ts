import {
  useHttp,
} from '@msg-pilot/hooks'

export const useAddTask = (data: any) => useHttp<{
  data: any,
  meta: any
}>({
  url: '/red/task',
  method: 'post',
  data,
})
