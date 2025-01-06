import {
  TASK_TYPE,
} from './enum'

export * from './enum'

export const TASK_TYPE_MAPPING: {[key in TASK_TYPE] : string} = {
  NOTE_COMMENT: '笔记评论',
}
