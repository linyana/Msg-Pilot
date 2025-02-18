import {
  TASK_TYPE,
} from './type'
import {
  TASK_STATUS,
} from './status'
import {
  DISTRIBUTION_RULE,
} from './destribution_rule'

export * from './status'
export * from './type'
export * from './destribution_rule'

export type ITaskType = {
  id: string
  created_at: number
  updated_at: number
  name?: string
  description?: string
  failed_reason?: string
  expect_count: number
  sent_count: string
  data: any
  account_ids?: number[]
  type: TASK_TYPE
  destribution_rule: DISTRIBUTION_RULE
  status: TASK_STATUS
}

export type ICreateTaskType = {
  name?: string
  description?: string
  failed_reason?: string
  expect_count: number
  data: any
  account_ids?: number[]
  type: TASK_TYPE
  destribution_rule: DISTRIBUTION_RULE
}
