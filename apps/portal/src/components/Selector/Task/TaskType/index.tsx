import {
  Select,
} from 'antd'
import {
  TASK_TYPE_MAPPING,
} from '@/types'
import {
  getSelectOptions,
} from '@/utils'

export const TaskTypeSelector = () => (
  <Select
    placeholder="选择你要发送的类型"
    options={getSelectOptions(TASK_TYPE_MAPPING)}
  />
)
