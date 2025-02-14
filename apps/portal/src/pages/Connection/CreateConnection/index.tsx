import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  Card,
  Steps,
  Typography,
  Button,
  Progress,
  Form,
  FormProps,
} from 'antd'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
  ShopOutlined,
  ApiOutlined,
  TeamOutlined,
} from '@ant-design/icons'
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
  const steps = [
    {
      description: '平台选择',
      icon: <ShopOutlined />,
    },
    {
      description: '连接信息',
      icon: <ApiOutlined />,
    },
    {
      description: '账号设置',
      icon: <TeamOutlined />,
    },
  ]

  const [form] = Form.useForm()

  const message = useMessage()
  const navigate = useNavigate()

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
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const onSubmit = () => {
    form.submit()
  }

  const onFinish: FormProps<ICreateConnectionFormType>['onFinish'] = (data) => {
    setFormData({
      connection: {
        name: data.connection_name,
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

  const onFinishFailed = (error: any) => {
    message.error(error.errorFields.map((item: any) => item.errors[0]).join(','))
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

  const items = useMemo(() =>
    steps.map((item, index) => ({
      title: item.description,
      icon: index === activeStep ? <LoadingOutlined /> : item.icon,
    })), [activeStep, steps])

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
            current={activeStep}
            items={items}
          />
          <Flex
            justifyContent="center"
            style={{
              marginTop: 32,
              width: '100%',
            }}
          >
            <div style={{
              width: '80%',
            }}
            >
              <Title
                level={4}
                style={{
                  textAlign: 'center',
                  padding: 16,
                }}
              >
                {steps[activeStep].description}
              </Title>
              {
                activeStep === 0 && (
                  <Step1
                    selectedPlatform={selectedPlatform}
                    setSelectedPlatform={setSelectedPlatform}
                  />
                )
              }
              <Form
                layout="vertical"
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <div style={{
                  display: activeStep === 1 ? 'block' : 'none',
                }}
                >
                  <Step2 />
                </div>
                <div style={{
                  display: activeStep === 2 ? 'block' : 'none',
                }}
                >
                  <Step3 />
                </div>
              </Form>
            </div>
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            style={{
              marginTop: 32,
            }}
            gap="16px"
          >
            <div>
              {
                activeStep
                  ? (
                    <Button
                      icon={<ArrowLeftOutlined />}
                      onClick={handleBack}
                      disabled={loading}
                      type="text"
                    >
                      返回
                    </Button>
                  )
                  : (
                    <Button
                      onClick={() => {
                        navigate('/connections')
                      }}
                      icon={<ArrowLeftOutlined />}
                      type="text"
                    >
                      返回连接列表
                    </Button>
                  )
              }
            </div>
            <Progress
              percent={(activeStep / (steps.length - 1)) * 100}
              size="small"
              showInfo={false}
              strokeColor="var(--main-bg-color)"
            />
            <div>
              {
                activeStep === steps.length - 1
                  ? (
                    <Button
                      onClick={onSubmit}
                      loading={loading}
                      icon={<ArrowRightOutlined />}
                      type="text"
                      iconPosition="end"
                    >
                      提交
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1}
                      icon={<ArrowRightOutlined />}
                      iconPosition="end"
                      type="text"
                    >
                      下一步
                    </Button>
                  )
              }
            </div>
          </Flex>
        </Card>
      </div>
    </Flex>
  )
}
