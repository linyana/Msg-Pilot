import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Typography,
} from 'antd'
import {
  Flex,
  Loading,
} from '@/components'
import {
  AccountSelector,
} from '@/pages/Setting/Account/components'

const {
  Text,
  Title,
} = Typography

export const CreateTask = () => {
  const [form] = Form.useForm()
  return (
    <Flex justifyContent="center">
      <div>
        <Flex justifyContent="center">
          <Text
            style={{
              fontSize: '1.875rem',
              fontWeight: 700,
            }}
          >
            Create a new task
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
            Create a new task to send messages.
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
                label="Name"
                required
              >
                <Input placeholder="type your name" />
              </Form.Item>
              <Form.Item
                label="Filter"
                required
              >
                <Input placeholder="type your filter" />
              </Form.Item>
              <Form.Item
                label="Content"
                required
              >
                <Input placeholder="type your content" />
              </Form.Item>
              <Flex justifyContent="space-between">
                <Form.Item
                  label="Count"
                  style={{
                    width: '48%',
                  }}
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
                  label="Account"
                  style={{
                    width: '48%',
                  }}
                >
                  <AccountSelector />
                </Form.Item>
              </Flex>
              <Form.Item label="Description">
                <Input.TextArea placeholder="type your description" />
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
                  >
                    Cancel
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
                    Submit
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
