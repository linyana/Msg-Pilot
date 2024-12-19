import styled from 'styled-components'

export const Skeleton = styled('div')<{ height: number }>(({
  theme, height,
}) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}))
