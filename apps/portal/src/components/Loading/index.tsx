import React from 'react'
import {
  CircularProgress,
} from '@mui/material'
import {
  Flex,
} from '../Flex'

type IPropsType = {
  loading: boolean;
  children: React.ReactNode;
  content?: React.ReactNode;
  size?: number;
  needMask?: boolean;
  zIndex?: number;
};

export const Loading = ({
  loading,
  children,
  content,
  size = 40,
  needMask = false,
  zIndex = 999,
}: IPropsType) => (
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
                  <CircularProgress size={size} />
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
                <CircularProgress size={size} />
              </Flex>
            )
          }
        </>
      ) : <>{children}</>
    }
  </div>
)
