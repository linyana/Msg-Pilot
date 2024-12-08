type IPropsType = {
  width?: string
  height?: string
  margin?: string
  padding?: string
  className?: string
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  justifyContent?: 'space-between' | 'space-around' | 'center' | 'normal' | 'flex-start' | 'flex-end'
  alignItems?: 'center' | 'start' | 'end' | 'normal' | 'stretch' | 'flex-start'
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  gap?: string,
  children?: React.ReactNode,
  style?: React.CSSProperties
}

export const Flex = ({
  width = 'auto',
  height = 'auto',
  margin = 'none',
  padding = 'none',
  flexWrap = 'nowrap',
  justifyContent = 'normal',
  alignItems = 'normal',
  className = '',
  flexDirection,
  children,
  gap,
  style,
}: IPropsType) => (
  <div
    style={{
      width,
      height,
      margin,
      padding,
      justifyContent,
      alignItems,
      flexWrap,
      gap,
      flexDirection,
      display: 'flex',
      ...style,
    }}
    className={className}
  >
    {children}
  </div>
)
