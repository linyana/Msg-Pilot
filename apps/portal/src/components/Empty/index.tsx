import {
  Typography,
} from '@mui/material'
import {
  Flex,
} from '..'
import EmptySrc from '@/assets/normal/empty.svg'

type IPropsType = {
  height?: number
  tip?: string
  style?: React.CSSProperties
}

export const Empty = ({
  height = 100,
  tip = 'No Data',
  style,
}: IPropsType) => (
  <div style={{
    padding: '16px 0',
  }}
  >
    <Flex
      style={{
        height,
        marginTop: 16,
        ...style,
      }}
      justifyContent="center"
    >
      <img
        src={EmptySrc}
        alt=""
      />
    </Flex>
    {
      tip && (
      <Typography
        textAlign="center"
        marginTop="16px"
      >
        {tip}
      </Typography>
      )
    }
  </div>
)
