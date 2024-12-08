import {
  useHttp,
} from '@auto-send-message/hooks'

export const useAddTask = (data: any) => useHttp<{
  data: any,
  meta: any
}>({
  url: '/red/task',
  method: 'post',
  data,
})
