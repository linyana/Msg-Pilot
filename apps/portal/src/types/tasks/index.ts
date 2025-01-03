import {
  TASK_STATUS,
} from './enum'

export type ITaskType = {
  id: string
  name?: string
  description?: string
  faild_reason?: string
  expect_count: number
  sent_count: string
  data: any
  status: TASK_STATUS
}
