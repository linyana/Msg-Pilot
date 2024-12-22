type IPropsType = {
  children: React.ReactNode
}

export const Center = ({
  children,
}: IPropsType) => (
  <div style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
  }}
  >
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    >
      {children}
    </div>
  </div>
)
