import {
  DISTRIBUTION_RULE,
} from './enum'

export * from './enum'

export const DESTRIBUTION_RULE_MAPPING: {[key in DISTRIBUTION_RULE] : string} = {
  ACCOUNT_UNIQUE: '该账号内不重复',
}
