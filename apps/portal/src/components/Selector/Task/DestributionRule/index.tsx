import {
  Form,
  Select,
} from 'antd'
import {
  DESTRIBUTION_RULE_MAPPING,
} from '@/types'
import {
  getSelectOptions,
} from '@/utils'

export const DestributionRuleSelector = () => (
  <Form.Item
    label="分发规则"
    style={{
      width: '48%',
    }}
    required
    name="destribution_rule"
  >
    <Select
      placeholder="选择你要使用的分发规则"
      options={getSelectOptions(DESTRIBUTION_RULE_MAPPING)}
    />
  </Form.Item>
)
