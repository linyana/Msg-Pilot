import {
  CircularProgress,
} from '@mui/material'
import {
  Flex,
} from '../Flex'

type IPropsType = {
  loading: boolean
  children: React.ReactNode
  content?: React.ReactNode
  size?: number
}

export const Loading = ({
  loading,
  children,
  content,
  size,
}: IPropsType) => (
  <>
    {
      loading ? (
        <>
          {
            content ? <>{content}</>
              : (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  padding="40px"
                >
                  <CircularProgress size={size} />
                </Flex>
              )
          }
        </>
      )
        : <>{children}</>
    }
  </>
)
