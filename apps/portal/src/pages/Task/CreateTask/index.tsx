import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Typography,
} from 'antd'
import {
  useNavigate,
} from 'react-router-dom'
import {
  Flex,
  Loading,
  AccountSelector,
  DestributionRuleSelector,
  TaskTypeSelector,
} from '@/components'

const {
  Text,
} = Typography

export const CreateTask = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
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
            >
              <Form.Item
                label="任务名"
                required
              >
                <Input placeholder="输入该任务的名字" />
              </Form.Item>
              <Form.Item
                label="筛选"
                required
              >
                <Input placeholder="输入你要查找的内容" />
              </Form.Item>
              <Form.Item
                label="内容"
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
                >
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={1}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="账号"
                  required
                  style={{
                    width: '48%',
                  }}
                >
                  <AccountSelector />
                </Form.Item>
              </Flex>
              <Flex justifyContent="space-between">
                <Form.Item
                  label="发送类型"
                  style={{
                    width: '48%',
                  }}
                  required
                >
                  <TaskTypeSelector />
                </Form.Item>
                <Form.Item
                  label="分发规则"
                  style={{
                    width: '48%',
                  }}
                  required
                >
                  <DestributionRuleSelector />
                </Form.Item>
              </Flex>
              <Form.Item label="描述">
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
