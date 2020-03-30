import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background: white;
  border: 1px solid gray;
  box-shadow: none;
  color: gray;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;
  
  &.action {
    background-color: dodgerblue;
    border: none;
    color: white;
  }
`

interface Props {
  children: string
  onClick: () => void
  action?: boolean
}

export const Button: React.FC<Props> = (props) => (
  <StyledButton onClick={props.onClick} className={props.action ? 'action' : ''}>
    {props.children}
  </StyledButton>
)
