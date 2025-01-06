import {
  IConnectionType,
} from '@/types/connections/enum'
import RedLogo from '@/assets/connections/red.svg'
import RedsLogo from '@/assets/connections/reds.svg'
import TikToksLogo from '@/assets/connections/tiktoks.svg'

type IConnectionInfoType = {
  [key in IConnectionType]: {
    name: string,
    logo: string,
    sLogo: string,
  }
}

export const CONNECTION_INFO: IConnectionInfoType = {
  Red: {
    name: 'RED',
    logo: RedLogo,
    sLogo: RedsLogo,
  },
  TikTok: {
    name: 'TikTok',
    logo: TikToksLogo,
    sLogo: TikToksLogo,
  },
}
