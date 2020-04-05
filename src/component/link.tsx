import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(RouterLink)`
  color: dodgerblue;
  font-size: 1rem;
  height: 2rem;
  padding: 0 1rem;
`

interface Props {
  children: React.ReactNode
  href: string
}

export const Link: React.FC<Props> = (props) => (
  <StyledLink to={props.href}>
    {props.children}
  </StyledLink>
)
