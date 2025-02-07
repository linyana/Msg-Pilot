import {
  useParams,
} from 'react-router-dom'

export const TaskDetails = () => {
  const {
    id,
  } = useParams()
  return (
    <div>
      TaskDetails
    </div>
  )
}
