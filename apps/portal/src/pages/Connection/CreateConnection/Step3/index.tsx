import {
  Form,
  Input,
} from 'antd'

const {
  TextArea,
} = Input

export const Step3 = () => (
  <>
    <Form.Item
      label="账号名"
      name="account_name"
      rules={[{
        message: '连接名需要在1到16位',
        max: 100,
        min: 1,
      }]}
    >
      <Input
        placeholder="输入你的账号名"
      />
    </Form.Item>
    <Form.Item
      label="Cookie"
      name="account_cookie"
    >
      <Input
        placeholder="输入你账号的Cookie"
      />
    </Form.Item>
    <Form.Item
      label="描述"
      name="connection_description"
    >
      <TextArea
        placeholder="输入描述"
      />
    </Form.Item>
  </>
)
