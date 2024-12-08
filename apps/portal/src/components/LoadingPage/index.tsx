import {
  Spin,
} from 'antd'
import {
  Flex,
} from '..'

type IPropsType = {
  tip?: string
  isNotNeedZIndex?: boolean,
}

export const LoadingPage = ({
  tip,
  isNotNeedZIndex,
}: IPropsType) => (
  <Flex
    style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255,255,255,1)',
      zIndex: isNotNeedZIndex ? 'none' : 999,
    }}
    justifyContent="center"
    alignItems="center"
  >
    <Spin
      size="large"
      tip={tip}
    >
      <div style={{
        width: '200px',
      }}
      />
    </Spin>
  </Flex>
)
