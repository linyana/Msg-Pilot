import {
  Flex,
} from '..'

type IPropsType = {
  needFixed?: boolean
}

export const CopyRight = ({
  needFixed,
}: IPropsType) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    style={{
      position: needFixed ? 'fixed' : 'relative',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '60px',
    }}
  >
    Copyright &copy;
    {new Date().getFullYear()}
    {' '}
    Msg Pilot. All Rights Reserved
  </Flex>
)
