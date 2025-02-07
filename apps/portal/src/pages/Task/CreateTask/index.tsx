import {
  Button,
  Card,
  Form,
  FormProps,
  Input,
  InputNumber,
  Typography,
} from 'antd'
import {
  useNavigate,
} from 'react-router-dom'
import {
  useEffect,
  useState,
} from 'react'
import {
  Flex,
  Loading,
  AccountSelector,
  TaskTypeSelector,
  DestributionRuleSelector,
} from '@/components'
import {
  useMessage,
} from '@/hooks'
import {
  useCreateTask,
} from '@/services'
import {
  ICreateTaskType,
} from '@/types'

const {
  Text,
} = Typography

export const CreateTask = () => {
  const [formData, setFormData] = useState<ICreateTaskType>()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const message = useMessage()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useCreateTask(formData)

  useEffect(() => {
    if (error) {
      message?.error(error)
    }
  }, [error])

  useEffect(() => {
    if (data?.data) {
      message?.success('创建成功')
      navigate('/tasks')
    }
  }, [data?.data])

  const onSubmit = () => {
    form.submit()
  }

  const onFinish: FormProps<any>['onFinish'] = (value) => {
    setFormData({
      name: value.name,
      description: value.description,
      type: value.type,
      destribution_rule: value.destribution_rule,
      account_ids: [Number(value.account_id)],
      data: {
        content: [value.content || ''],
        filter: [value.filter || ''],
      },
      expect_count: value.expect_count,
    })
  }

  useEffect(() => {
    if (formData) {
      fetchData?.()
    }
  }, [formData])

  return (
    <Flex
      justifyContent="center"
      style={{
        marginTop: 32,
      }}
    >
      <div>
        <Flex justifyContent="center">
          <Text
            style={{
              fontSize: '1.875rem',
              fontWeight: 700,
            }}
          >
            创建新任务
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Text
            style={{
              color: 'rgb(123, 128, 154)',
              fontSize: '1.25rem',
              fontWeight: 400,
              marginBottom: '40px',
            }}
          >
            创建发送消息的任务.
          </Text>
        </Flex>
        <Card style={{
          width: '40vw',
        }}
        >
          <Loading
            loading={false}
            needMask
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="任务名"
                name="name"
                required
              >
                <Input placeholder="输入该任务的名字" />
              </Form.Item>
              <Form.Item
                label="筛选"
                required
                name="filter"
              >
                <Input placeholder="输入你要查找的内容" />
              </Form.Item>
              <Form.Item
                label="内容"
                name="content"
                required
              >
                <Input placeholder="输入你要发送的消息" />
              </Form.Item>
              <Flex justifyContent="space-between">
                <Form.Item
                  label="预计发送数量"
                  style={{
                    width: '48%',
                  }}
                  required
                  initialValue={1}
                  name="expect_count"
                >
                  <InputNumber
                    min={1}
                    max={10000}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
                <AccountSelector />
              </Flex>
              <Flex justifyContent="space-between">
                <TaskTypeSelector />
                <DestributionRuleSelector />
              </Flex>
              <Form.Item
                label="描述"
                name="description"
              >
                <Input.TextArea placeholder="输入你的描述" />
              </Form.Item>
              <Flex
                justifyContent="space-between"
                style={{
                  marginTop: '8px',
                }}
              >
                <div style={{
                  width: '48%',
                }}
                >
                  <Button
                    style={{
                      width: '100%',
                    }}
                    onClick={() => {
                      navigate('/tasks')
                    }}
                  >
                    返回
                  </Button>
                </div>
                <Form.Item style={{
                  width: '48%',
                }}
                >
                  <Button
                    onClick={onSubmit}
                    loading={loading}
                    type="primary"
                    style={{
                      width: '100%',
                    }}
                  >
                    提交
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </Loading>
        </Card>
      </div>
    </Flex>
  )
}
