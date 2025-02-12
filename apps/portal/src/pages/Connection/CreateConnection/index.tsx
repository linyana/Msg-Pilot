import {
  Button,
  FormControl,
  MobileStepper,
} from '@mui/material'
import {
  useEffect,
  useMemo,
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
  Card,
  Steps,
  Typography,
} from 'antd'
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

const {
  Title,
} = Typography

export const CreateConnection = () => {
  const [formData, setFormData] = useState<ICreateConnectionType>()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState<CONNECTION_TYPE>()
  const steps = ['平台选择', '连接信息', '账号设置']

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
        message.warning('请先选择一个平台')
      } else if (selectedPlatform === 'TikTok') {
        message.warning('TikTok暂不开放')
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    } else if (activeStep === 1) {
      if (!await trigger('name')) {
        message.warning('连接名是必填项')
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
      message.success('连接创建成功')
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

  const stepTitles = ['Finished', 'In Progress', 'Waiting']

  const items = useMemo(() => [
    {
      description: '选择平台',
    },
    {
      description: '创建连接',
    },
    {
      description: '创建账号',
    },
  ].map((item, index) => ({
    ...item,
    title: stepTitles[Math.min(index, activeStep)],
  })), [activeStep])

  return (
    <Flex justifyContent="center">
      <div>
        <Title
          level={3}
          style={{
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          创建连接
        </Title>
        <Typography
          style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          创建一个新连接来发送消息
        </Typography>
        <Card style={{
          width: '40vw',
          minWidth: 600,
        }}
        >
          <Steps
            current={1}
            percent={60}
            items={items}
          />
          <Flex
            justifyContent="center"
            style={{
              marginTop: 32,
              width: '100%',
            }}
          >
            <div>
              <Title
                level={4}
                style={{
                  textAlign: 'center',
                  padding: 16,
                }}
              >
                {steps[activeStep]}
              </Title>
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
                maxWidth: '70%',
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
                          提交
                          <KeyboardArrowRight />
                        </LoadingButton>
                      ) : (
                        <Button
                          size="small"
                          onClick={handleNext}
                          disabled={activeStep === steps.length - 1}
                        >
                          下一步
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
                          返回
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
                          返回连接列表
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
