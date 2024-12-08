import styled from 'styled-components'

export const SingleLineEllipsis = styled.div({
  width: '100%',
  display: 'inline-block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})

export const MultipleLineEllipsis = styled.div(({
  line = 1,
}: {line?: number}) => ({
  width: '100%',
  height: line * 24,
  display: '-webkit-box',
  boxSizing: 'border-box',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: line,
} as any))
