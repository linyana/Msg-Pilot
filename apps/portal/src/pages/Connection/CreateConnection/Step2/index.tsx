import {
  Form,
  Input,
} from 'antd'

const {
  TextArea,
} = Input

export const Step2 = () => (
  <>
    <Form.Item
      label="连接名"
      name="connection_name"
      rules={[{
        required: true,
        message: '连接名不能为空, 且需要在1到100位之间',
        max: 100,
        min: 1,
      }]}
    >
      <Input
        placeholder="输入你的连接名"
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
