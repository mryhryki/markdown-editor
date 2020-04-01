import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from '../component/header'
import { Button } from '../component/button'
import styled from 'styled-components'

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

interface Props {

}

export const History: React.FC<Props> = (props) => {
  const history = useHistory()

  return (
    <>
      <Header>
        <Button onClick={() => history.push('/')}>
          エディタ
        </Button>
      </Header>
      <Wrapper>
        <h1>History</h1>
      </Wrapper>
    </>
  )
}
