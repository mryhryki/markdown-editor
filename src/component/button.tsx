import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background: white;
  box-shadow: none;
  border: 1px solid gray;
  color: gray;
  height: 2rem;
  padding: 0 1rem;
`

interface Props {
  children: string
  onClick: () => void
}

export const Button: React.FC<Props> = (props) => (
  <StyledButton>
    {props.children}
  </StyledButton>
)
