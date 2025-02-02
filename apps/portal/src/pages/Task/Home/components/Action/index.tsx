import {
  Button,
} from 'antd'
import {
  useEffect,
} from 'react'
import {
  ITaskType,
} from '@/types'
import {
  useRetryTask,
} from '@/services'
import {
  useMessage,
} from '@/hooks'

type IPropsType = {
  record: ITaskType
}

export const TaskAction = ({
  record,
}: IPropsType) => {
  const message = useMessage()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useRetryTask({
    task_id: Number(record.id),
  })

  useEffect(() => {
    if (data?.data) {
      message.success('成功开始重试')
    }
  }, [data?.data])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <>
      {
        ['FAILED', 'PARTIAL_COMPLETED', 'NOT_START'].includes(record.status) && (
          <Button
            loading={loading}
            onClick={() => {
              fetchData?.()
            }}
          >
            重试
          </Button>
        )
      }
    </>
  )
}
