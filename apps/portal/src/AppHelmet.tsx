import React, {
  useMemo,
} from 'react'
import {
  Helmet,
} from 'react-helmet'
import {
  useAppSelector,
} from './store'
import OvercastIcon from './assets/overcast.ico'
import auto-send-messageIcon from './assets/logo.ico'

export const AppHelmet = React.memo(() => {
  const {
    merchant_id,
  } = useAppSelector((state) => state.global)
  const isOvercast = useMemo(() => merchant_id === '3', [merchant_id])
  return (
    <Helmet>
      <title>{ isOvercast ? 'Overcast' : 'auto-send-message' }</title>
      <link
        rel="icon"
        href={isOvercast ? OvercastIcon : auto-send-messageIcon}
      />
    </Helmet>
  )
})
