import {
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import {
  PlusOutlined,
  CopyOutlined,
} from '@ant-design/icons'
import {
  useContext,
  useState,
} from 'react'
import {
  AppContext,
} from '@/App'
import {
  useAppSelector,
} from '@/store'

type IPropType = {
  isOpen?: boolean,
  setIsOpen?: (arg: boolean) => void
  setUploadSrc?: (arg: string) => void
}

export const UploadImage = ({
  isOpen = true,
  setIsOpen,
  setUploadSrc,
}: IPropType) => {
  const {
    token,
  } = useAppSelector((state) => state.global)

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const handleCancel = () => {
    setIsOpen?.(false)
  }
  const {
    messageApi,
  } = useContext(AppContext)

  const uploadButton = (
    <button
      style={{
        border: 0, background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{
        marginTop: 8,
      }}
      >
        Upload
      </div>
    </button>
  )

  const handleChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    if (newFileList?.[newFileList.length - 1]?.response?.data) {
      setUploadSrc?.(newFileList[newFileList.length - 1].response.data)
    }
    setFileList(newFileList)
  }

  return (
    <Modal
      open={isOpen}
      centered
      onCancel={handleCancel}
      footer={null}
      title="Upload Image"
    >
      <Upload
        action={`${import.meta.env.VITE_API_BASE_URL}/utils/upload`}
        listType="picture-card"
        fileList={fileList}
        showUploadList={{
          showPreviewIcon: false,
          showDownloadIcon: true,
          downloadIcon: <CopyOutlined
            style={{
              color: 'white',
            }}
            onClick={window.console.log}
          />,
        }}
        headers={{
          Authorization: `Bearer ${token}`,
        }}
        onDownload={(e) => {
          navigator.clipboard.writeText(e.response.data)
          messageApi.success('Image source successfully copied.')
        }}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
    </Modal>
  )
}
