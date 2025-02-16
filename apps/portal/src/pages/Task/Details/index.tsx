import {
  useEffect,
} from 'react'
import {
  useParams,
} from 'react-router-dom'
import {
  useGetTask,
} from '@/services'

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
    <div>
      TaskDetails
    </div>
  )
}
