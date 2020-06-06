import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;
`

interface Props {
  children: string
  onClick: () => void
}

export const Button: React.FC<Props> = (props) => (
  <StyledButton onClick={props.onClick}>
    {props.children}
  </StyledButton>
)
