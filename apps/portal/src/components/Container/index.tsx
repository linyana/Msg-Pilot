type IPropsType = {
    width?: string
    height?: string
    margin?: string
    padding?: string
    className?: string
    children?: React.ReactNode,
    style?: React.CSSProperties
  }
export const Container = ({
  width = 'auto',
  height = 'auto',
  margin = 'none',
  padding = 'none',
  children,
  style,
  className,
}:IPropsType) => (

  <div
    style={{
      background: '#ffffff',
      borderRadius: '6px',
      width,
      height,
      margin,
      padding,
      ...style,
    }}
    className={className}
  >
    {children}
  </div>
)
