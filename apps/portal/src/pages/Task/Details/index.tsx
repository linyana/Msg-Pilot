import {
  useEffect,
  useState,
} from 'react'
import {
  useParams,
} from 'react-router-dom'
import {
  useGetTask,
  useGetTasks,
} from '@/services'
import { 
  Avatar,
  Card,
  Col,
  Divider,
  List,
  Row,
  Statistic,
  Table,
  TableProps,
  Typography,
} from 'antd'
import {
  Flex, 
  Status
} from '@/components'
import { IAccountType, ITaskType } from '@/types'
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import { TaskAction } from '../Home/components'

const {
  Title,
  Text,
} = Typography

export const Data = ({
  name,
  content,
}: {
  name: string
  content?: React.ReactNode
}) => {
  return (
    <Flex marginBottom='8px'>
      <Text 
        strong 
        style={{
          width: '100px'
        }}
      >
        {name}
      </Text>
      <Text>{content || ''}</Text>
    </Flex>
  )
}

export const TaskDetails = () => {
  const [task, setTask] = useState<ITaskType>()
  const [accounts, setAccounts] = useState<IAccountType[]>([])

  const {
    id = '',
  } = useParams()

  const {
    data,
    fetchData,
  } = useGetTask(id)

  useEffect(() => {
    if (id) {
      fetchData?.()
    }
  }, [id])

  useEffect(() => {
    if (data?.data) {
      setTask(data.data)
      setAccounts(data.data.task_accounts?.map((item) => item.account))
    }
  }, [data?.data])

  const {
    data: getData,
    fetchData: fetchData2,
    loading,
    error,
  } = useGetTasks()

  const refreshData = () => {
    fetchData2?.()
  }

  useEffect(() => {
    refreshData()
  }, [])

  const columns: TableProps<ITaskType>['columns'] = [
    {
      title: '任务名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (_, record) => (
        <Flex
          gap="8px"
          justifyContent="center"
        >
          {record?.name || record?.name || ''}
        </Flex>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (_, record) => (
        <Status
          status={record?.status}
          failed_reason={record?.failed_reason}
        />
      ),
    },
    {
      title: '已发送数量',
      dataIndex: 'sent_count',
      key: 'sent_count',
      align: 'center',
    },
    {
      title: '预期发送数量',
      dataIndex: 'found_count',
      key: 'found_count',
      align: 'center',
    },
    {
      title: '最大发送数量',
      dataIndex: 'expect_count',
      key: 'expect_count',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'expect_count',
      key: 'expect_count',
      align: 'center',
      render: (_, record) => (
        <>{(record.created_at ? dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') : '-')}</>
      ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Flex justifyContent="center">
          <TaskAction record={record} />
        </Flex>
      ),
    },
  ]

  return (
    <>
      <Flex justifyContent='space-between' gap="16px">
        <Card 
          style={{
            width: '60%',
          }}
          title={task?.name || ''}
        >
          <Data name="任务状态" content={<Status status={task?.status || 'NOT_START'} failed_reason={task?.failed_reason} />} />
          <Data name="搜索内容" content={task?.data?.filter?.[0] || '无'} />
          <Data name="发布内容" content={task?.data?.content?.[0] || '无'} />
          <Data name="任务描述" content={task?.description || '暂时没有描述'} />
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="已发送数量" value={task?.sent_count || 0} />
            </Col>
            <Col span={12}>
              <Statistic title="预期发送数量" value={task?.expect_count} />
            </Col>
          </Row>
        </Card>
         <Card 
          style={{
            width: '40%',
          }}
          title="账号"
        >
          <List
            itemLayout="horizontal"
            dataSource={accounts}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.description || '暂时没有描述'}
                />
              </List.Item>
            )}
          />
        </Card>
      </Flex>
      <Card style={{ marginTop: '16px' }}>
         <div style={{ width: '100%', height: '300px' }}>
          <ReactECharts option={{
            title: {
              text: '发送频率'
            },
            tooltip: {},
            xAxis: {
              data: ['2025-2-19', '2025-2-20', '2025-2-21', '2025-2-22', '2025-2-23', '2025-2-24', '2025-2-25']
            },
            yAxis: {},
            series: [{
              name: '发送数量',
              type: 'line',
              data: [5, 20, 36, 10, 10, 20, 30]
            }]
          }} />
        </div>
      </Card>
      <Card style={{ marginTop: '16px' }}>
          <Table
            style={{
              marginTop: 16,
            }}
            columns={columns}
            dataSource={getData?.data}
            rowKey="id"
        />
      </Card>
    </>
  )
}
