import {
  useEffect,
} from 'react'
import {
  useGetInfo,
} from '@/services'

type IPropsType = {
  children: React.ReactNode
}

export const AuthProvider = ({
  children,
}: IPropsType) => {
  const {
    data,
    fetchData,
    loading,
    error,
  } = useGetInfo()

  useEffect(() => {
    fetchData?.()
  }, [])

  return (
    <div>
      { children}
    </div>
  )
}
