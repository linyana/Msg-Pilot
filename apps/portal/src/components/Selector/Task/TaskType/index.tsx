import {
  Form,
  Select,
} from 'antd'
import {
  TASK_TYPE_MAPPING,
} from '@/types'
import {
  getSelectOptions,
} from '@/utils'

export const TaskTypeSelector = () => (
  <Form.Item
    label="发送类型"
    style={{
      width: '48%',
    }}
    required
    name="type"
  >
    <Select
      placeholder="选择你要发送的类型"
      options={getSelectOptions(TASK_TYPE_MAPPING)}
    />
  </Form.Item>
)
