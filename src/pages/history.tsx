import * as React from 'react'
import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'
import { useState } from 'react'
import {
  getMemos,
  MemoRecord,
} from '../indexeddb/memos'

const { useEffect } = React

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
`

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface Props {
  setText: (text: string) => void
}

export const History: React.FC<Props> = (props) => {
  const { setText } = props
  const [memos, setMemos] = useState<MemoRecord[]>([])
  const history = useHistory()

  useEffect(() => {
    getMemos().then(setMemos)
  }, [])

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">
            エディタに戻る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map((memo) => {
          return (
            <Memo
              key={memo.datetime}
              onClick={() => {
                setText(memo.text)
                history.push('/editor')
              }}
            >
              <MemoTitle>{memo.title}</MemoTitle>
              <MemoText>{memo.text}</MemoText>
            </Memo>
          )
        })}
      </Wrapper>
    </>
  )
}
