import {
  Button,
} from 'antd'
import {
  useEffect,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  ITaskType,
} from '@/types'
import {
  useRetryTask,
} from '@/services'
import {
  useMessage,
} from '@/hooks'
import {
  Flex,
} from '@/components'

type IPropsType = {
  record: ITaskType
}

export const TaskAction = ({
  record,
}: IPropsType) => {
  const message = useMessage()
  const navigate = useNavigate()

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
    <Flex>
      <>
        <Button
          loading={loading}
          onClick={() => {
            navigate(`/tasks/${record.unit_id}`)
          }}
        >
          查看详情
        </Button>
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
    </Flex>
  )
}
