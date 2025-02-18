import {
  useEffect,
} from 'react'
import {
  useParams,
} from 'react-router-dom'
import {
  useGetTask,
} from '@/services'
import { 
  Card,
} from 'antd'
import {
  Flex 
} from '@/components'

export const TaskDetails = () => {
  const {
    id = '',
  } = useParams()

  const {
    data,
    fetchData,
  } = useGetTask(id)

  useEffect(() => {
    if (id) {
      fetchData?.()
    }
  }, [id])

  useEffect(() => {
    if (data?.data) {
      console.log(data?.data)
    }
  }, [data?.data])

  return (
    <>
      <Flex justifyContent='space-between' gap="16px">
        <Card 
          style={{
            width: '60%',
          }}
        >
          1
        </Card>
         <Card 
          style={{
            width: '40%',
          }}
        >
          1
        </Card>
      </Flex>
    </>
  )
}
