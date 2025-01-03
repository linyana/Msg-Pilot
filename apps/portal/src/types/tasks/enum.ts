enum TASKSTATUS {
  NOT_START,
  WAITING,
  RUNNING,
  FAILED,
  COMPLETED,
  PARTIAL_COMPLETED,
}

export const TASK_STATUS = Object.fromEntries(
  Object.keys(TASKSTATUS)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => [key, key]),
) as Record<keyof typeof TASKSTATUS, keyof typeof TASKSTATUS>

export type TASK_STATUS = keyof typeof TASK_STATUS;
