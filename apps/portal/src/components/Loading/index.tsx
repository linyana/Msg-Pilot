import React from 'react'
import {
  createPortal,
} from 'react-dom'
import {
  Spin,
} from 'antd'
import {
  LoadingOutlined,
} from '@ant-design/icons'
import {
  Flex,
} from '../Flex'
import {
  Center,
} from '../Center'

type IPropsType = {
  loading: boolean;
  children: React.ReactNode;
  content?: React.ReactNode;
  size?: number;
  needMask?: boolean;
  zIndex?: number;
  isGlobal?: boolean;
};

export const Loading = ({
  loading,
  children,
  content,
  size = 40,
  needMask = false,
  zIndex = 999,
  isGlobal = false,
}: IPropsType) => {
  if (isGlobal && loading) {
    return createPortal(
      <Center>
        <Flex
          justifyContent="center"
          alignItems="center"
          padding="40px"
        >
          <Spin
            indicator={<LoadingOutlined spin />}
            style={{
              fontSize: size,
            }}
          />
        </Flex>
      </Center>,
      document.body,
    )
  }

  return (
    <div style={{
      position: 'relative',
    }}
    >
      {
        loading ? (
          <>
            {
              needMask ? (
                <>
                  <div
                    style={{
                      display: loading ? 'flex' : 'none',
                      zIndex,
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      backgroundColor: needMask ? 'rgba(255,255,255,0.5)' : 'transparent',
                      backdropFilter: needMask ? 'blur(2px)' : 'none',
                    }}
                  >
                    {content || (
                    <Spin
                      indicator={<LoadingOutlined spin />}
                      style={{
                        fontSize: size,
                      }}
                    />
                    )}
                  </div>
                  {children}
                </>
              ) : (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  padding="40px"
                >
                  <Spin
                    indicator={<LoadingOutlined spin />}
                    style={{
                      fontSize: size,
                    }}
                  />
                </Flex>
              )
            }
          </>
        ) : <>{children}</>
      }
    </div>
  )
}
