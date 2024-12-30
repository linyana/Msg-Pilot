import {
  ThemeConfig,
} from 'antd'

export const theme: ThemeConfig = {
  components: {
    Tabs: {
      horizontalMargin: '0',
    },
    Button: {
      colorPrimary: 'var(--main-color)',
      colorPrimaryHover: '#4dce7f',
      colorPrimaryActive: '#49b171',
    },
    Menu: {
      itemSelectedBg: 'var(--main-color)',
      itemSelectedColor: 'white',
      itemHoverBg: '#4dce7f',
      itemHoverColor: 'white',
    },
  },
}
