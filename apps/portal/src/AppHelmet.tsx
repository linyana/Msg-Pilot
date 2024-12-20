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
import msg-pilotIcon from './assets/logo.ico'

export const AppHelmet = React.memo(() => {
  const {
    merchant_id,
  } = useAppSelector((state) => state.global)
  const isOvercast = useMemo(() => merchant_id === '3', [merchant_id])
  return (
    <Helmet>
      <title>{ isOvercast ? 'Overcast' : 'msg-pilot' }</title>
      <link
        rel="icon"
        href={isOvercast ? OvercastIcon : msg-pilotIcon}
      />
    </Helmet>
  )
})
