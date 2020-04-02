import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  align-content: center;
  display: flex;
  font-size: 1.5rem;
  height: 2rem;
  justify-content: space-between;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Control = styled.div`
  height: 2rem;
  display: flex;
  align-content: center;
`

interface Props {
  title: string
  children: React.ReactNode
}

export const Header: React.FC<Props> = (props) => (
  <StyledHeader>
    <div>
      {props.title}
    </div>
    <Control>
      {props.children}
    </Control>
  </StyledHeader>
)
