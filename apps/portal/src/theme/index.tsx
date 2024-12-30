import {
  ThemeConfig,
} from 'antd'

export const theme: ThemeConfig = {
  components: {
    Tabs: {
      horizontalMargin: '0',
    },
    Button: {
      colorPrimary: 'var(--main-bg-color)',
      colorPrimaryHover: '#4dce7f',
      colorPrimaryActive: '#49b171',
      primaryShadow: '0 2px 3px rgba(60, 185, 108, 0.3)',
    },
    Menu: {
      itemSelectedBg: 'var(--main-bg-color)',
      itemSelectedColor: 'white',
      itemHoverBg: '#4dce7f',
      itemHoverColor: 'white',
      itemActiveBg: '#5ae28e',
    },
    Pagination: {
      colorPrimary: 'var(--main-bg-color)',
    },
    Input: {
      activeBorderColor: 'var(--main-bg-color)',
      hoverBorderColor: 'var(--main-bg-color)',
      activeShadow: '0 2px 3px rgba(60, 185, 108, 0.3)',
    },
  },
  token: {
    colorPrimary: 'var(--main-bg-color)',
  },
}
