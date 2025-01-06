import {
  Box,
  Typography,
} from '@mui/material'
import {
  PlatformCard,
} from './styled'
import {
  CONNECTION_TYPE,
} from '@/types'
import {
  CONNECTION_INFO,
} from '@/constants'

type IPropsType = {
  selectedPlatform: CONNECTION_TYPE | undefined,
  setSelectedPlatform: React.Dispatch<React.SetStateAction<CONNECTION_TYPE | undefined>>
}

const platforms: {
  name: string,
  type: CONNECTION_TYPE,
  logo: string,
  style: { [key in string]: any },
  disabled?: boolean
}[] = [
  {
    name: '小红书',
    type: 'Red',
    logo: CONNECTION_INFO.Red.sLogo,
    style: {
      '&.selected': {
        background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
        boxShadow: '0 8px 16px rgba(255, 0, 127, 0.3)',
        color: '#fff',
      },
    },
  },
  {
    name: 'TikTok',
    type: 'TikTok',
    logo: CONNECTION_INFO.TikTok.sLogo,
    style: {
      '&.selected': {
        background: 'linear-gradient(135deg, #505050, #a7a7a7)',
        boxShadow: '0 8px 16px rgba(105, 105, 105, 0.3)',
        color: '#fff',
      },
    },
    disabled: true,
  },
]

export const Step1 = ({
  selectedPlatform,
  setSelectedPlatform,
}: IPropsType) => {
  const handleSelect = (platform: CONNECTION_TYPE) => {
    setSelectedPlatform(platform)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        flexWrap: 'wrap',
        mt: 4,
      }}
    >
      {platforms.map((platform) => (
        <PlatformCard
          key={platform.name}
          className={selectedPlatform === platform.type ? 'selected' : ''}
          onClick={() => {
            handleSelect(platform.type)
          }}
          sx={{
            ...(selectedPlatform === platform.type && platform.style),
          }}
        >
          <Box
            component="img"
            src={platform.logo}
            alt={platform.name}
            sx={{
              width: '32px',
              height: '32px',
              mb: 2,
              transition: 'transform 0.3s ease',
              ...(selectedPlatform === platform.type && {
                transform: 'scale(1.2)',
              }),
            }}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'color 0.3s ease',
              ...(selectedPlatform === platform.type && {
                color: '#fff',
              }),
            }}
          >
            {platform.name}
          </Typography>
        </PlatformCard>
      ))}
    </Box>
  )
}
