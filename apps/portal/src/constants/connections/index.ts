import {
  CONNECTION_TYPE,
} from '@/types/connections/enum'
import RedLogo from '@/assets/connections/red.svg'

type IConnectionInfoType = {
  [key in CONNECTION_TYPE]: {
    name: string,
    logo: string,
  }
}

export const CONNECTION_INFO: IConnectionInfoType = {
  Red: {
    name: 'RED',
    logo: RedLogo,
  },
}
