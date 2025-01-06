enum TASKTYPE {
  NOTE_COMMENT
}

export const TASK_TYPE = Object.fromEntries(
  Object.keys(TASKTYPE)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => [key, key]),
) as Record<keyof typeof TASKTYPE, keyof typeof TASKTYPE>

export type TASK_TYPE = keyof typeof TASK_TYPE;
