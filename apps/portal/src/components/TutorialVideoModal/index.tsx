import {
  Button,
  Tooltip,
  Modal,
  Spin,
} from 'antd'
import {
  useState,
} from 'react'
import ReactPlayer from 'react-player'
import videoSvg from '@/assets/video.svg'
import {
  Flex,
} from '@/components'

type IPropsType = {
  title: string
  url: string
}

export const TutorialVideoModal = ({
  title,
  url,
}: IPropsType) => {
  const [videoModalVisible, setVideoModalVisible] = useState<boolean>(false)
  const [controlSpin, setControlSpin] = useState<boolean>(true)

  const handleVideoReady = () => {
    setControlSpin(false)
  }
  return (
    <>
      <Button
        onClick={() => { setVideoModalVisible(true) }}
        type="text"
        icon={(
          <Tooltip title={<article>Tutorial Video</article>}>
            <Flex
              alignItems="center"
              justifyContent="center"
              style={{
                paddingTop: 3,
              }}
            >
              <img
                src={videoSvg}
                alt=""
              />
            </Flex>
          </Tooltip>
        )}
      />
      <Modal
        title={title || ''}
        centered
        open={videoModalVisible}
        onOk={() => setVideoModalVisible(false)}
        onCancel={() => setVideoModalVisible(false)}
        okText="Start"
        closable
      >
        <Spin spinning={controlSpin}>
          <ReactPlayer
            width="100%"
            height="25rem"
            style={{
              marginBottom: '.5rem',
            }}
            config={{
              youtube: {
                playerVars: {
                  origin: 'https://www.youtube.com',
                },
              },
            }}
            controls
            onReady={handleVideoReady}
            playing={videoModalVisible}
            url={url || ''}
          />
        </Spin>
      </Modal>
    </>
  )
}
