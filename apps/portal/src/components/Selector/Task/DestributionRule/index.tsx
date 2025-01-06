import {
  Select,
} from 'antd'
import {
  DESTRIBUTION_RULE_MAPPING,
} from '@/types'
import {
  getSelectOptions,
} from '@/utils'

export const DestributionRuleSelector = () => (
  <Select
    placeholder="选择你要使用的分发规则"
    options={getSelectOptions(DESTRIBUTION_RULE_MAPPING)}
  />
)
