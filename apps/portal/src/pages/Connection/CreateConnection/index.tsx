import {
  Button,
  Card,
  MobileStepper,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import StoreIcon from '@mui/icons-material/Store'
import BadgeIcon from '@mui/icons-material/Badge'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  useState,
} from 'react'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material'
import {
  ColorlibConnector,
  ColorlibStepIconRoot,
} from './styled'
import {
  Center,
  Flex,
} from '@/components'

function ColorlibStepIcon(props: StepIconProps) {
  const {
    active,
    completed,
    className,
  } = props

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <StoreIcon />,
    2: <BadgeIcon />,
    3: <SettingsIcon />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{
        completed, active,
      }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

export const CreateConnection = () => {
  const steps = ['Platform info', 'Connection info', 'Settings']
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  return (
    <Center>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        marginBottom="8px"
      >
        Create Connection
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        textAlign="center"
        marginBottom="40px"
      >
        Create a new connection to send message
      </Typography>
      <Card sx={{
        padding: '32px 16px',
        width: 600,
      }}
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Flex
          justifyContent="center"
          style={{
            marginTop: 32,
          }}
        >
          <MobileStepper
            variant="progress"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: 400,
              flexGrow: 1,
            }}
            nextButton={(
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            )}
            backButton={(
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            )}
          />
        </Flex>
      </Card>
    </Center>
  )
}
