import {
  Button,
  Card,
  FormControl,
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
  useEffect,
  useState,
} from 'react'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material'
import {
  useForm,
} from 'react-hook-form'
import {
  LoadingButton,
} from '@mui/lab'
import {
  useNavigate,
} from 'react-router-dom'
import {
  ColorlibConnector,
  ColorlibStepIconRoot,
} from './styled'
import {
  Flex,
} from '@/components'
import {
  Step1,
} from './Step1'
import {
  ICreateConnectionType,
  CONNECTION_TYPE,
  ICreateConnectionFormType,
} from '@/types'
import {
  Step2,
} from './Step2'
import {
  useMessage,
} from '@/hooks'
import {
  Step3,
} from './Step3'
import {
  useCreateConnection,
} from '@/services'

const stepIcon = (props: StepIconProps) => {
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
  const [formData, setFormData] = useState<ICreateConnectionType>()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState<CONNECTION_TYPE>()
  const steps = ['Platform', 'Connection Information', 'Settings']

  const message = useMessage()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: {
      errors,
    },
  } = useForm<ICreateConnectionFormType>()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useCreateConnection(formData)

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!selectedPlatform) {
        message.warning('Please select a platform first.')
      } else if (selectedPlatform === 'TikTok') {
        message.warning('TikTok is not available now.')
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    } else if (activeStep === 1) {
      if (!await trigger('name')) {
        message.warning('Name is required')
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const onSubmit = (data: ICreateConnectionFormType) => {
    setFormData({
      connection: {
        name: data.name,
        description: data.description,
      },
      account: {
        name: data.account_name,
        cookie: data.account_cookie,
        description: data.account_description,
      },
      type: selectedPlatform,
    })
  }

  useEffect(() => {
    if (formData) {
      fetchData?.()
    }
  }, [formData])

  useEffect(() => {
    if (data?.data) {
      message.success('Successfully created a new connection.')
      navigate('/connections')
    }
  }, [data?.data])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: any) => {
    const {
      value,
    } = e.target
    setValue(fieldName, value)
    await trigger(fieldName)
  }

  return (
    <Flex justifyContent="center">
      <div>
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
                <StepLabel
                  slots={{
                    stepIcon,
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Flex
            justifyContent="center"
            style={{
              marginTop: 32,
              width: '100%',
            }}
          >
            <div>
              <Typography
                textAlign="center"
                variant="h4"
                style={{
                  padding: 16,
                }}
              >
                {steps[activeStep]}
              </Typography>
              {
                activeStep === 0 && (
                  <Step1
                    selectedPlatform={selectedPlatform}
                    setSelectedPlatform={setSelectedPlatform}
                  />
                )
              }
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  width: '400px',
                }}
              >
                <FormControl fullWidth>
                  {
                    activeStep === 1 && (
                      <Step2
                        control={control}
                        errors={errors}
                        handleChange={handleChange}
                      />
                    )
                  }
                  {
                    activeStep === 2 && (
                      <Step3
                        control={control}
                        errors={errors}
                      />
                    )
                  }
                </FormControl>
              </form>
            </div>
          </Flex>
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
                maxWidth: 480,
                flexGrow: 1,
                padding: 0,
              }}
              nextButton={(
                <>
                  {
                    activeStep === steps.length - 1
                      ? (
                        <LoadingButton
                          size="small"
                          onClick={handleSubmit(onSubmit)}
                          type="submit"
                          loading={loading}
                        >
                          Submit
                          <KeyboardArrowRight />
                        </LoadingButton>
                      ) : (
                        <Button
                          size="small"
                          onClick={handleNext}
                          disabled={activeStep === steps.length - 1}
                        >
                          Next
                          <KeyboardArrowRight />
                        </Button>
                      )
                  }
                </>
              )}
              backButton={(
                <>
                  {
                    activeStep
                      ? (
                        <Button
                          size="small"
                          onClick={handleBack}
                          disabled={loading}
                        >
                          <KeyboardArrowLeft />
                          Back
                        </Button>
                      )
                      : (
                        <Button
                          size="small"
                          onClick={() => {
                            navigate('/connections')
                          }}
                        >
                          <KeyboardArrowLeft />
                          Return
                        </Button>
                      )
                  }
                </>
              )}
            />
          </Flex>
        </Card>
      </div>
    </Flex>
  )
}
