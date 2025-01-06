import {
  ITaskStatus,
} from './enum'

export type IITaskType = {
  id: string
  name?: string
  description?: string
  faild_reason?: string
  expect_count: number
  sent_count: string
  data: any
  status: ITaskStatus
}
