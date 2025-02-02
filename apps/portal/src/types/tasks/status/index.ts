import {
  TASK_STATUS,
} from './enum'

export * from './enum'

export const TASK_STATUS_MAPPING: {[key in TASK_STATUS] : string} = {
  NOT_START: '未开始',
  WAITING: '等待中',
  RUNNING: '运行中',
  FAILED: '失败',
  COMPLETED: '已完成',
  PARTIAL_COMPLETED: '部分完成',
  SEARCHING: '搜索中',
  COMPLETED_SEARCH: '已完成搜索',
  PARTIAL_COMPLETED_SEARCH: '已完成部分搜索',
}
